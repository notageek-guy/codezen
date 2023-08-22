import React from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Button } from "../button";
import { useEditorStore } from "@/store/store";
import clsx from "clsx";
import { languageOptions } from "@/constants/langs";
import { useToast } from "../use-toast";
import { getOptions } from "@/api/headers";
function CompileResult() {
  const code = useEditorStore((state) => state.code);
  const processing = useEditorStore((state) => state.processing);
  const btnText = processing ? "Processing..." : "Compile and Execute";
  const setProcess = useEditorStore((state) => state.setProcessing);
  const customInput = useEditorStore((state) => state.customInput);
  const lang = useEditorStore((state) => state.lang);
  const setOutput = useEditorStore((state) => state.setOuptut);

  const { toast } = useToast();

  const handleCompile = async (): Promise<void> => {
    setProcess(true);
    const languageIndex = languageOptions.findIndex(
      (option) => option.value === lang
    );
    const langId =
      languageIndex !== -1 ? languageOptions[languageIndex].id : null;

    const formatData = {
      language_id: langId,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };

    const options: AxiosRequestConfig = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": getOptions["X-RapidAPI-Key"],
        "X-RapidAPI-Host": getOptions["X-RapidAPI-Host"],
      },
      data: formatData,
    };

    try {
      const response = await axios.request(options);
      const token = response.data.token;
      await checkStatus(token);
    } catch (error: unknown) {
      const err = error as AxiosError;
      const status = err.response?.status;
      console.log("status", status);
      if (status === 429) {
        toast({
          variant: "destructive",
          title: "Quota limit has been reached",
        });
      }
      setProcess(false);

      console.error("Error compiling:", error);
    }
  };

  const checkStatus = async (token: string): Promise<void> => {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `${"https://judge0-ce.p.rapidapi.com/submissions"}/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": getOptions["X-RapidAPI-Host"],
        "X-RapidAPI-Key": getOptions["X-RapidAPI-Key"],
      },
    };

    try {
      const response = await axios.request(options);
      const statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
      } else {
        setProcess(false);
        setOutput(response.data);
        toast({
          title: "Compiled Successfully",
        });
        console.log("response.data", response.data);
      }
    } catch (error) {
      console.error("Error checking status:", error);
      setProcess(false);
      toast({
        variant: "destructive",
        title: "Something went wrong during compilation",
      });
    }
  };
  return (
    <div className="mt-4 float-right">
      <Button
        disabled={!code}
        onClick={handleCompile}
        size="lg"
        variant={"outline"}
        className={clsx({
          "opacity-50": !code,
        })}
      >
        {btnText}
      </Button>
    </div>
  );
}

export default CompileResult;
