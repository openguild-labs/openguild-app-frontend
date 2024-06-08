import thumbnail from "@assets/images/game-thumbnail.webp";
import avatar from "@assets/images/game-avatar.png";
import Tag from "@/components/Tag";
import { Link } from "react-router-dom";
import { MISSIONS_PATH } from "@/constants/links";

const MISSION_CARD_HEIGHT = 365;
const THUMBNAIL_HEIGHT = 184;

function MissionCard({ isStudent }: any) {
  return (
    <div className="shrink-0 w-full">
      <Link
        to={`${MISSIONS_PATH}/1`}
        reloadDocument
        className="block rounded-2xl bg-indigo-600 w-full border border-white/10  hover:border-orange-500"
        style={{
          height: MISSION_CARD_HEIGHT,
        }}
      >
        <div
          className=" relative pb-6 "
          style={{
            height: THUMBNAIL_HEIGHT,
          }}
        >
          <div className="px-2 py-1 rounded-md bg-primary-color text-xs absolute top-4 left-5 text-white">
            {isStudent ? "Student" : "Social"}
          </div>
          <img alt="thumbnail" src={thumbnail} className="w-full h-full rounded-t-2xl" />
          <img
            alt="avatar"
            src={avatar}
            className="w-[46px] h-[46px] rounded-full absolute left-[28px] bottom-6 translate-y-1/2 text-black"
          />
        </div>
        <div
          className="flex flex-col w-full"
          style={{
            height: MISSION_CARD_HEIGHT - THUMBNAIL_HEIGHT,
          }}
        >
          <div className="py-2 px-4 h-1/3 w-full border-b-[0.5px] border-neutral-800 text-white">
            <h3>{isStudent ? "Student Only Mission" : "Onboarding to Nakame Social"}</h3>
          </div>
          <div className="py-2 px-4 h-1/3 w-full border-b-[0.5px] border-neutral-800 flex text-black">
            <div className="w-1/2 h-full">
              <div className="h-1/2 flex items-center justify-start">
                <span className="w-full text-xs text-white">Finish in</span>
              </div>
              <div className="h-1/2 flex items-center justify-start">
                <span className="w-full text-white">22d 3h 16m</span>
              </div>
            </div>
          </div>
          <div className="py-2 px-4 h-1/3 w-full">
            <div className="flex w-full overflow-hidden gap-x-1">
              <Tag value="EP 15" />
              <Tag value="Badge Archloot" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MissionCard;
