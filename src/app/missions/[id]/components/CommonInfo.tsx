import Tag from "@/components/Tag";

interface ICommonInfoProps {
  imgSrc: string;
  category: string;
  participants: number;
  totalXP: number;
}

function CommonInfo({ imgSrc, category, participants, totalXP }: ICommonInfoProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="rounded-xl shadow-lg bg-white p-3 w-full flex flex-col gap-y-3 relative">
        <img loading="lazy" src={imgSrc} alt="thumbnail" className="object-cover aspect-square rounded-lg" />
        <div className="flex gap-x-2">
          <Tag size="large" value={category} isWholeWord className=" bg-[#6b3ffdae] text-white border-transparent" />
          <Tag size="large" value={`${totalXP} XP`} className="w-fit" />
        </div>
      </div>
      <div className="flex items-end">
        <div className="w-[40%]">
          <span>Total participant</span>
        </div>
        <div className="w-[60%]">
          <span className="text-2xl text-primary-color">{participants}</span>
        </div>
      </div>
    </div>
  );
}

export default CommonInfo;
