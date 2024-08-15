import Tag from "@/components/Tag";
import { MISSIONS_PATH } from "@/constants/links";
import Link from "next/link";

interface IMissionCardProps {
  mission: TMissionResponse;
}

function MissionCard({ mission }: IMissionCardProps) {
  const statusMap = mission?.status?.split("|");

  return (
    <div className="shrink-0 w-full">
      <Link
        href={`${MISSIONS_PATH}/${mission?.id}`}
        className="block rounded-lg w-full hover:scale-[102%] duration-200 transition p-2"
        style={{
          backgroundColor: mission.isFeatured === "true" ? "rgb(107 63 253 / 0.08)" : "transparent",
        }}
      >
        <div className="w-full aspect-square relative">
          <img alt="thumbnail" src={mission?.bannerURL} className="w-full h-full rounded-md object-cover" />
        </div>
        <div className="flex flex-col w-full gap-y-2 mt-2">
          <div className="w-full text-black">
            <h3 className="text-ellipsis font-bold line-clamp-1">{mission.title}</h3>
          </div>
          <div className="w-full flex items-center text-black gap-x-2">
            <span className="text-sm">{statusMap[0]}</span>
            <span className="text-primary-color text-sm">{statusMap[1]}</span>
          </div>
          <div className="w-full">
            <div className="flex w-full overflow-hidden gap-x-1 text-black">
              <Tag value={mission.category} isWholeWord className=" bg-primary-color text-white border-transparent" />
              <Tag value={`${mission.xp} XP`} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MissionCard;
