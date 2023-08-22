import OutputBox from "./OutputBox";
import InputBox from "./InputBox";
import ResultBox from "./ResultBox";

function SidePanel() {
  return (
    <div className="border grid grid-rows-3 ">
      <div className="border-b-2 w-full p-4 ">
        <InputBox />
      </div>
      <div className="p-4 border-b-2 relative">
        <OutputBox />
      </div>
      <div className="flex flex-col p-4">
        <ResultBox />
      </div>
    </div>
  );
}

export default SidePanel;
