import { useEditorStore } from "@/store/store";
import React from "react";

function InputBox() {
  const inputText = useEditorStore((state) => state.customInput);
  const setInputText = useEditorStore((state) => state.setCustomInput);
  return (
    <div className="border p-2 rounded-lg shadow-lg h-full w-full hide-scrollbar">
      <div className="flex">
        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      <div className="mt-2 text-sm">{"Input"}</div>
      <div className=" mt-2 p-2 rounded-lg overflow-auto h-24">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full h-full bg-transparent resize-none border-none outline-none"
        />
      </div>
    </div>
  );
}

export default InputBox;
