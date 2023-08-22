import ReactCodeMirror from "@uiw/react-codemirror";
import { vim } from "@replit/codemirror-vim";
import { useEditorStore } from "@/store/store";
import { extensions } from "@/lib/langs";
import { icons } from "@/lib/icons";
import SidePanel from "./SidePanel";
import CompileResult from "./CompileResult";
import { useCallback } from "react";
import { ViewUpdate } from "@codemirror/view";
import SaveSnippet from "./SaveSnippet";

function Editor() {
  const code = useEditorStore((state) => state.code);
  const theme = useEditorStore((state) => state.theme);
  const lang = useEditorStore((state) => state.lang);
  const setCode = useEditorStore((state) => state.setCode);
  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    setCode(value);
  }, []);
  const selectedExtension = extensions[lang] || [];

  const LangIcon = icons[lang] || (() => null);
  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="border p-4 overflow-scroll col-span-3 relative">
          <div className="overlay rounded-md relative overflow-hidden w-full h-full shadow-4xl">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <LangIcon className="text-2xl" />
              </div>
              <CompileResult />
            </div>
            <ReactCodeMirror
              autoFocus={true}
              basicSetup={{
                syntaxHighlighting: true,
                lineNumbers: true,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: false,
              }}
              theme={theme}
              extensions={[selectedExtension, vim()]}
              onChange={onChange}
              height="85vh"
              value={code}
            />
            <SaveSnippet />
          </div>
        </div>
        <SidePanel />
      </div>
    </div>
  );
}

export default Editor;
