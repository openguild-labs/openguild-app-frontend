import RewardBannerImg from "@assets/images/reward-banner.jpg";
import profile from "@assets/images/profile.svg";
import { MdPhotoCamera } from "react-icons/md";

const Banner = () => {
  return (
    <div className="relative">
      <div className=" absolute bottom-[-70px] left-[42%]">
        <div className="flex items-center justify-center bg-[#56595C] rounded-full w-8 h-8 absolute bottom-2 right-2 cursor-pointer">
          <MdPhotoCamera />
        </div>
        <img className="w-40 h-40 rounded-xl object-cover" src={profile} alt="reward-banner" />
      </div>

      <img className="h-[262px] md:h-[362px] lg:h-[462px] rounded-xl object-cover" src={RewardBannerImg} alt="reward-banner" />
    </div>
  );
};
export default Banner;
