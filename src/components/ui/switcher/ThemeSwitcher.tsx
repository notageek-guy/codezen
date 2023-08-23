import { topThemes } from "../../../lib/theme";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEditorStore } from "@/store/store";
import { formatStr } from "@/utils/formatString";
const themeMappings: { [key: string]: any } = {
  "Tokyo Night": topThemes["Tokyo Night"],
  Dracula: topThemes["Darcula"],
  "Atom One": topThemes["Atom One"],
  "GitHub Light": topThemes["GitHub Light"],
  "GitHub Dark": topThemes["GitHub Dark"],
  "Gruvbox Dark": topThemes["Gruvbox Dark"],
  "Gruvbox Light": topThemes["Gruvbox Light"],
  Material: topThemes["Material"],
  "Material Dark": topThemes["Material Dark"],
  Nord: topThemes["Nord"],
};

function ThemeSwitcher() {
  const setTheme = useEditorStore((state) => state.setTheme);

  const handleThemeChange = (selectedThemeName: string) => {
    const selectedTheme = themeMappings[selectedThemeName];
    setTheme(selectedTheme);
  };

  return (
    <Select onValueChange={handleThemeChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          {Object.keys(topThemes).map((themeName) => (
            <SelectItem key={themeName} value={themeName}>
              {formatStr(themeName)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ThemeSwitcher;
