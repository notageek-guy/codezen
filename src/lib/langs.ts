import { LanguageSupport } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";

export const extensions: { [key: string]: LanguageSupport[] } = {
  python: [python()],
  javascript: [javascript()],
  typescript: [
    javascript({
      typescript: true,
    }),
  ],
  "c++": [cpp()],
  java: [java()],
  cpp: [cpp()],
  rust: [rust()],
};
