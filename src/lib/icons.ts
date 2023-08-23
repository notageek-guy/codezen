import {
  BiLogoJavascript,
  BiLogoTypescript,
  BiLogoPython,
  BiLogoJava,
  BiLogoCPlusPlus,
} from "react-icons/bi";
import { FaRust } from "react-icons/fa";

import type { IconType } from "react-icons";

interface Icons {
  [extension: string]: IconType;
}

export const icons: Icons = {
  javascript: BiLogoJavascript,
  typescript: BiLogoTypescript,
  python: BiLogoPython,
  java: BiLogoJava,
  cpp: BiLogoCPlusPlus,
  rust: FaRust,
  c: BiLogoCPlusPlus,
};
