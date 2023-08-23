import { languageOptions } from "@/constants/langs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatStr } from "@/utils/formatString";
import { useEditorStore } from "@/store/store";
import { sampleCode } from "@/constants/sample-code";

function LangSwitcher() {
  const setLang = useEditorStore((state) => state.setLang);

  const setCode = useEditorStore((state) => state.setCode);
  const handleLang = (val: string) => {
    setLang(val);
    setCode(sampleCode[val as keyof typeof sampleCode]);
  };

  return (
    <Select onValueChange={handleLang}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {languageOptions.map((option) => (
            <SelectItem key={option.id} value={option.value}>
              {formatStr(option.label)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default LangSwitcher;
