import thumbnail from "@assets/images/game-thumbnail.webp";
import avatar from "@assets/images/game-avatar.png";
import Tag from "@/components/Tag/Tag";
import { Link } from "react-router-dom";

const MISSION_CARD_HEIGHT = 365;
const THUMBNAIL_HEIGHT = 160;

function Mission() {
  return (
    <div className="px-2 shrink-0 w-[25%]">
      <Link
        to="#"
        className="transition-effect block bg-[#121416] rounded-2xl w-full border border-transparent hover:border-[#0fdbd1]"
        style={{
          height: MISSION_CARD_HEIGHT,
        }}
      >
        <div
          className="p-[6px] rounded-t-2xl relative pb-6"
          style={{
            height: THUMBNAIL_HEIGHT,
          }}
        >
          <div className="px-2 py-1 rounded-md bg-[#0fdbd1] text-xs absolute top-4 left-5 text-black">Social</div>
          <img alt="thumbnail" src={thumbnail} className="w-full h-full rounded-t-2xl" />
          <img alt="avatar" src={avatar} className="w-[46px] h-[46px] rounded-full absolute left-[28px] bottom-6 translate-y-1/2" />
        </div>
        <div
          className="flex flex-col w-full"
          style={{
            height: MISSION_CARD_HEIGHT - THUMBNAIL_HEIGHT,
          }}
        >
          <div className="py-2 px-4 h-1/3 w-full border-b-[0.5px] border-neutral-800">
            <h3>Onboarding to Nakame Social</h3>
          </div>
          <div className="py-2 px-4 h-1/3 w-full border-b-[0.5px] border-neutral-800 flex">
            <div className="w-1/2 h-full">
              <div className="h-1/2 flex items-center justify-start">
                <span className="w-full text-xs text-neutral-300">Finish in</span>
              </div>
              <div className="h-1/2 flex items-center justify-start">
                <span className="w-full">22d 3h 16m</span>
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

export default Mission;
