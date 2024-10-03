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
        className="block rounded-lg w-full hover:scale-[102%] duration-200 transition p-2 relative"
        style={{
          backgroundColor: mission.isFeatured === "true" ? "rgb(107 63 253 / 0.08)" : "transparent",
        }}
      >
        {mission.isFeatured === "true" && (
          <div className="absolute shadow top-0 left-0 bg-pink-500 text-xs text-white font-bold px-2 py-1 rounded">
            <span>🔥 Featured</span>
          </div>
        )}

        <div className="w-full aspect-square">
          <img
            alt="thumbnail"
            src={mission?.bannerURL}
            className="w-full h-full  rounded-md object-contain"
            style={{ background: "linear-gradient(91.1deg, rgb(57, 31, 105) -2.3%, rgb(115, 43, 155) 44.4%, rgb(231, 75, 184) 103.4%)" }}
          />
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
