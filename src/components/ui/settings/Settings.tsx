import { Settings as SettingIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEditorStore } from "@/store/store";

interface CheckboxWithLabelProps {
  label: string;
  checked: boolean;
  onChange: (newValue: boolean) => void;
}

function CheckboxWithLabel({
  label,
  checked,
  onChange,
}: CheckboxWithLabelProps) {
  return (
    <label
      className="flex items-center space-x-2 cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <div
        className={`w-5 h-5 rounded border border-gray-400 ${
          checked ? "bg-blue-500 border-blue-500" : ""
        }`}
      ></div>
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}

function Settings() {
  const toggleVim = useEditorStore((state) => state.toggleVim);
  const isToggled = useEditorStore((state) => state.vimEnabled);
  return (
    <Dialog>
      <DialogTrigger>
        <SettingIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Settings</DialogHeader>
        <div className="flex items-center space-x-2">
          <CheckboxWithLabel
            label="Enable Vim Integration"
            checked={isToggled}
            onChange={toggleVim}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Settings;
