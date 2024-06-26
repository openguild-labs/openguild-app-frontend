import PixelEditor from "@/components/Pixel/PixelEditor";
import RewardBannerImg from "@assets/images/reward-banner.jpg";

const Banner = () => {
  return (
    <div className="relative">
      <div className=" absolute bottom-0 left-0 right-0 m-auto size-fit translate-y-1/2">
        <div className="w-32 h-32 rounded-full overflow-hidden relative z-0">
          <PixelEditor rows={14} cols={14} />;
        </div>
      </div>
      <img className="h-[262px] md:h-[362px] lg:h-[462px] rounded-xl object-cover" src={RewardBannerImg} alt="reward-banner" />
    </div>
  );
};
export default Banner;
