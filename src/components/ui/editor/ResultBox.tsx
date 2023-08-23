import { useEditorStore } from "@/store/store";

function ResultBox() {
  const outputDetails = useEditorStore((state) => state.output);
  return (
    <div className="border p-2 rounded-lg shadow-lg h-full w-full hide-scrollbar ">
      <div className="flex">
        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      <div className="mt-2 text-sm">{"Result"}</div>
      <div className=" mt-2 p-2 rounded-lg overflow-auto h-24 flex flex-col gap-y-2">
        <p className="text-sm">
          <span className="font-semibold px-2 py-1 rounded-md">
            {outputDetails?.status?.description}
          </span>
        </p>
        <p className="text-sm">
          Memory:{""}
          <span className="font-semibold px-2 py-1 rounded-md">
            {outputDetails?.memory}
          </span>
        </p>
        <p className="text-sm">
          Time: {""}
          <span className="font-semibold px-2 py-1 rounded-md">
            {outputDetails?.time}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ResultBox;
