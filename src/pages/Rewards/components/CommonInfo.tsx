import Tag from "@/components/Tag";
import thumbnail from "@assets/images/game-thumbnail.webp";

function CommonInfo() {
  return (
    <div className="flex flex-col gap-y-6">
      <span className="text-xl text-primary-color">Reward</span>
      <div className="rounded-xl border border-neutral-700 p-3 w-full flex flex-col gap-y-3">
        <img src={thumbnail} alt="thumbnail" className="object-cover aspect-square rounded-lg" />
        <Tag size="large" value="EP 3" className="w-fit" />
      </div>
      <div>
        <div className="w-full bg-neutral-800 h-[1px] my-6" />
        <div className="flex gap-x-2">
          <div className="w-2/5 flex items-center text-base">Total participant</div>
          <div className="w-3/5 flex items-center text-2xl text-primary-color">1764</div>
        </div>
      </div>
    </div>
  );
}

export default CommonInfo;
