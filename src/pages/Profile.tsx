import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Trash } from "lucide-react";

import {
  collection,
  getDocs,
  where,
  query,
  QueryDocumentSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface SnippetData {
  id: string;
  code: string;
  author: string;
  lang: string;
  createdAt: string;
  // Add more fields if needed
}
import { BiLogoJavascript, BiLogoTypescript, BiLogoJava } from "react-icons/bi";
import { FaPython, FaRust } from "react-icons/fa";

function Profile() {
  const { toast } = useToast();
  const [user] = useAuthState(auth);
  const [snippets, setSnippets] = useState<SnippetData[]>([]);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);

  const customThrottle = (func: (...args: any[]) => void, delay: number) => {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: any[]) => {
      if (!timeout && !isDeleteInProgress) {
        setIsDeleteInProgress(true);
        func(...args);
        timeout = setTimeout(() => {
          timeout = null;
          setIsDeleteInProgress(false);
        }, delay);
      }
    };
  };

  async function deleteSnippet(id: string) {
    try {
      await deleteDoc(doc(db, `codesnippets/${id}`));
      toast({ title: "Snippet Deleted" });
      setSnippets((prevSnippets) =>
        prevSnippets.filter((snippet) => snippet.id !== id)
      );
    } catch (error) {
      console.error("Error", error);
      toast({ title: "Deletion snippet failed" });
    }
  }

  const throttledDeleteSnippet = customThrottle(deleteSnippet, 1000); // Throttle to 1 second

  useEffect(() => {
    if (!user) return;

    const fetchSnippets = async () => {
      try {
        const snippetsQuery = query(
          collection(db, "codesnippets"),
          where("id", "==", user.uid)
          // Add more conditions if needed
        );

        const querySnapshot = await getDocs(snippetsQuery);
        const snippetsData: SnippetData[] = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot) =>
            ({
              id: doc.id, // Get the document ID
              ...doc.data(),
            } as SnippetData)
        );
        setSnippets(snippetsData);
      } catch (error) {
        console.error("Error fetching snippets:", error);
      }
    };

    fetchSnippets();
  }, [user]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Saved Snippets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snippets.map((snippet) => (
          <div key={snippet.id} className="bg-gray-800 p-4 rounded shadow-md">
            <div className="flex mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>

            <div>
              {snippet.lang === "javascript" ? (
                <>
                  <BiLogoJavascript className="text-2xl" />
                </>
              ) : snippet.lang === "java" ? (
                <>
                  <BiLogoJava className="text-2xl" />
                </>
              ) : snippet.lang === "typescript" ? (
                <>
                  <BiLogoTypescript className="text-2xl" />
                </>
              ) : snippet.lang === "rust" ? (
                <>
                  <FaRust className="text-2xl" />
                </>
              ) : snippet.lang === "python" ? (
                <>
                  <FaPython className="text-2xl" />
                </>
              ) : null}
            </div>

            <pre className="text-green-300 overflow-x-auto">{snippet.code}</pre>
            <p className="text-gray-400 mt-2">Author: {snippet.author}</p>
            <p className="text-gray-400">
              Created At:{" "}
              {new Date(snippet.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <Button
              size="icon"
              variant="outline"
              className="float-right bg-gray-800"
              onClick={() => throttledDeleteSnippet(snippet.id)}
            >
              <Trash className="text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
