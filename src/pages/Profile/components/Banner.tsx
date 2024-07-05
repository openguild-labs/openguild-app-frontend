import PixelEditor from "@/components/Pixel/PixelEditor";
import RewardBannerImg from "@assets/images/banner.webp";

const Banner = () => {
  return (
    <div className="relative mt8 mb-12 z-0">
      <div className=" absolute bottom-0 left-0 right-0 m-auto size-fit translate-y-1/2 z-10">
        <div className="w-[135px]  h-[137px] rounded-full overflow-hidden relative z-100">
          <PixelEditor rows={14} cols={14} />;
        </div>
      </div>
      <img
        className="h-[300px] md:h-[300px] lg:h-[300px]  object-cover z-0 w-full relative rounded-lg"
        src={RewardBannerImg}
        style={{
          backgroundPosition: "center",
        }}
        alt="reward-banner"
      />
    </div>
  );
};
export default Banner;
