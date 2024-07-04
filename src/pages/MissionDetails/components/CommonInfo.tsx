import Tag from "@/components/Tag";
import { MISSION_STATUS__TYPE } from "@/constants/mission";

interface ICommonInfoProps {
  imgSrc: string;
  status: string;
  participants: number;
}
const renderTagStatus = (status: string) => {
  switch (status) {
    case MISSION_STATUS__TYPE.NOT_START:
      return <Tag size="large" value={MISSION_STATUS__TYPE.NOT_START} isWholeWord className=" text-[#da2877]" />;
    case MISSION_STATUS__TYPE.IN_PROGRESS:
      return (
        <Tag size="large" value={MISSION_STATUS__TYPE.IN_PROGRESS} isWholeWord className=" bg-[#6b3ffdae] text-white border-transparent" />
      );
    default:
      return <Tag size="large" value={MISSION_STATUS__TYPE.ENDED} isWholeWord className="bg-gray-200 text-gray-500" />;
  }
};
function CommonInfo({ imgSrc, status, participants }: ICommonInfoProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="rounded-xl shadow-lg bg-white p-3 w-full flex flex-col gap-y-3 relative">
        <img loading="lazy" src={imgSrc} alt="thumbnail" className="object-cover aspect-square rounded-lg" />
        <div className="flex gap-x-2">
          {renderTagStatus(status)}
          <Tag size="large" value="XP farming" className="w-fit" />
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
