import React, { useCallback, useState } from "react";
import { Button } from "../button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useToast } from "../use-toast";
import { useEditorStore } from "@/store/store";

type DebounceFunction = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
) => (...args: Parameters<F>) => void;

const customDebounce: DebounceFunction = (func, delay) => {
  let timeoutId: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

function SaveSnippet() {
  const [user] = useAuthState(auth);
  const code = useEditorStore((state) => state.code);
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false); // Add state to track saving status
  const lang = useEditorStore((state) => state.lang);
  const data = {
    code,
    lang,
    author: user?.displayName,
    createdAt: new Date().toISOString(),
    id: user?.uid,
  };

  const checkDuplicateSnippet = async () => {
    const snippetsQuery = query(
      collection(db, "codesnippets"),
      where("code", "==", code),
      where("id", "==", user?.uid)
    );

    const querySnapshot = await getDocs(snippetsQuery);
    return !querySnapshot.empty;
  };

  const throttledSave = useCallback(
    customDebounce(async () => {
      if (!user) {
        console.error("Bruh");
        return;
      }

      if (await checkDuplicateSnippet()) {
        toast({ title: "Duplicate code snippet detected" });
        return;
      }

      try {
        setIsSaving(true); // Set saving status
        await addDoc(collection(db, "codesnippets"), data);
        toast({ title: "Added code snippet" });
      } catch (error) {
        console.error("Error adding code snippet:", error);
        toast({ title: "Code Snippet couldn't be added" });
      } finally {
        setIsSaving(false); // Reset saving status
      }
    }, 1000),
    [user, data, toast]
  );

  return (
    <Button
      variant="outline"
      className="mt-2 float-right"
      onClick={isSaving ? undefined : throttledSave}
      disabled={isSaving}
    >
      {isSaving ? "Saving..." : "Save Code"}
    </Button>
  );
}

export default SaveSnippet;
