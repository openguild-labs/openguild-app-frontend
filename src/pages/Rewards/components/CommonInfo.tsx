import Tag from "@/components/Tag";
import thumbnail from "@assets/images/game-thumbnail.webp";

function CommonInfo() {
  return (
    <div className="flex flex-col gap-y-6">
      <span className="text-xl text-primary-color">Reward</span>
      <div className="rounded-xl shadow-lg bg-white p-3 w-full flex flex-col gap-y-3 relative">
        <div className="absolute top-8 left-8 bg-primary-color text-white text-md px-5 py-1.5 rounded-md">Lucky Ticket</div>
        <img src={thumbnail} alt="thumbnail" className="object-cover aspect-square rounded-lg" />
        <Tag size="large" value="EP 5" className="w-fit" />
      </div>
      <div></div>
    </div>
  );
}

export default CommonInfo;
