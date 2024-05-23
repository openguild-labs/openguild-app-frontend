import Tag from "@/components/Tag";
import thumbnail from "@assets/images/game-thumbnail.webp";

function CommonInfo() {
  return (
    <div className="flex flex-col gap-y-6">
      <span className="text-xl text-primary-color">Reward</span>
      <div className="rounded-xl border border-neutral-700 p-3 w-full flex flex-col gap-y-3 relative">
        <div className="absolute top-4 left-4 bg-[#ff7300] text-sm px-5 py-2 rounded-md text-black">Lucky Ticket</div>
        <img src={thumbnail} alt="thumbnail" className="object-cover aspect-square rounded-lg" />
        <Tag size="large" value="EP 5" className="w-fit" />
      </div>
      <div></div>
    </div>
  );
}

export default CommonInfo;
