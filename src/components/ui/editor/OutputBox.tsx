import React from "react";
import { useEditorStore } from "@/store/store";

interface OutputDetails {
  status?: {
    id?: number;
  };
  compile_output?: string;
  stdout?: string;
  stderr?: string;
}

function OutputBox() {
  const output = useEditorStore((state) => state.output);
  const statusId = output?.status?.id;

  const result: Record<number, React.ReactNode> = {
    6: (
      <pre className="px-2 py-1 font-normal text-xs text-red-500">
        {output?.compile_output ? atob(output.compile_output) : null}
      </pre>
    ),
    3: (
      <pre className="px-2 py-1 font-normal text-xs text-green-500">
        {output?.stdout ? atob(output.stdout) : null}
      </pre>
    ),
    5: (
      <pre className="px-2 py-1 font-normal text-xs text-red-500">
        {"Time Limit Exceeded"}
      </pre>
    ),
  };

  const selectedResultComponent = result[statusId];
  const defaultResult = (
    <pre className="px-2 py-1 font-normal text-xs text-red-500">
      {output?.stderr ? atob(output.stderr) : null}
    </pre>
  );

  return (
    <div className="border p-2 rounded-lg shadow-lg h-full w-full">
      <div className="flex">
        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      <div className="mt-2 text-sm">{"Output"}</div>
      <div className="mt-2 p-2 rounded-lg overflow-auto h-24">
        {selectedResultComponent ?? defaultResult}
      </div>
    </div>
  );
}

export default OutputBox;
