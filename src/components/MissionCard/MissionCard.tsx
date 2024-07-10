import Tag from "@/components/Tag";
import { MISSIONS_PATH } from "@/constants/links";
import { MISSION_STATUS__TYPE } from "@/constants/mission";
import avatar from "@assets/images/logo.png";
import { Skeleton } from "@mui/material";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const MISSION_CARD_HEIGHT = 365;
const THUMBNAIL_HEIGHT = 184;

interface IMissionCardProps {
  mission: TMissionResponse;
}

const renderTagStatus = (status: string) => {
  switch (status) {
    case MISSION_STATUS__TYPE.NOT_START:
      return <Tag value={MISSION_STATUS__TYPE.NOT_START} isWholeWord className=" text-[#da2877]" />;
    case MISSION_STATUS__TYPE.IN_PROGRESS:
      return <Tag value={MISSION_STATUS__TYPE.IN_PROGRESS} isWholeWord className=" bg-[#6b3ffdae] text-white border-transparent" />;
    default:
      return <Tag value={MISSION_STATUS__TYPE.ENDED} isWholeWord className="bg-gray-200 text-gray-500" />;
  }
};

function MissionCard({ mission }: IMissionCardProps) {
  const statusMap = mission?.status?.split("|");
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  return (
    <div className="shrink-0 w-full">
      <Link
        to={`${MISSIONS_PATH}/${mission?.id}`}
        reloadDocument
        className="block rounded-lg bg-white w-full shadow-lg hover:scale-[102%] duration-200 transition"
        style={{
          height: MISSION_CARD_HEIGHT,
        }}
      >
        <div
          className="relative pb-6"
          style={{
            height: THUMBNAIL_HEIGHT,
          }}
        >
          <div className="px-2 py-1 rounded-md bg-primary-color text-xs absolute top-4 left-5 text-white">{mission.category}</div>
          <LazyLoadImage
            alt="thumbnail"
            src={mission?.bannerURL}
            className="w-full h-full rounded-t-lg object-cover"
            beforeLoad={() => {
              setIsLoadingImage(true);
            }}
            onLoad={() => {
              setIsLoadingImage(false);
            }}
          />
          {isLoadingImage && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                height: "calc(100% - 24px)",
              }}
            >
              <Skeleton
                variant="rectangular"
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  inset: 0,
                }}
                animation="wave"
                className="w-full h-full rounded-t-lg"
              />
              <CiImageOn size={52} className="text-neutral-300" />
            </div>
          )}
          <img
            alt="avatar"
            src={avatar}
            className="w-[46px] h-[46px] rounded-full absolute left-[28px] bottom-6 translate-y-1/2 border border-neutral-400 bg-white z-[5px]"
          />
        </div>
        <div
          className="flex flex-col w-full"
          style={{
            height: MISSION_CARD_HEIGHT - THUMBNAIL_HEIGHT,
          }}
        >
          <div className="py-2 px-4 h-1/3 w-full border-b-[0.5px] border-gray-200 text-black">
            <h3 className="text-ellipsis line-clamp-2">{mission.title}</h3>
          </div>
          <div className="py-2 px-4 h-1/3 w-full border-b-[0.5px] border-gray-200 flex text-black">
            <div className="w-1/2 h-full">
              <div className="h-1/2 flex items-center justify-start">
                <span className="w-full text-xs">{statusMap[0]}</span>
              </div>
              <div className="h-1/2 flex items-center justify-start">
                <span className="w-full text-black">{statusMap[1]}</span>
              </div>
            </div>
          </div>
          <div className="py-2 px-4 h-1/3 w-full">
            <div className="flex w-full overflow-hidden gap-x-1 text-black">
              {renderTagStatus(mission.statusType)}
              <Tag value={`${mission.xp} XP`} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MissionCard;
