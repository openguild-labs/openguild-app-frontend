import Tag from "@/components/Tag";

interface ICommonInfoProps {
  imgSrc: string;
  status: string;
  participants: number;
}

function CommonInfo({ imgSrc, status, participants }: ICommonInfoProps) {
  const statusElem = status?.split("|");
  return (
    <div className="flex flex-col gap-y-6">
      <div className="rounded-xl shadow-lg bg-white p-3 w-full flex flex-col gap-y-3 relative">
        <img loading="lazy" src={imgSrc} alt="thumbnail" className="object-cover aspect-square rounded-lg" />
        <div className="flex gap-x-2">
          <Tag size="large" value="OG labs" className="w-fit" />
          <Tag size="large" value="XP farming" className="w-fit" />
        </div>
      </div>
      <div className="flex items-end">
        <div className="w-[40%]">
          <span>{statusElem ? statusElem[0] : ""}</span>
        </div>
        <div className="w-[60%]">
          <span className="text-2xl text-primary-color">{statusElem ? statusElem[1] : ""}</span>
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
