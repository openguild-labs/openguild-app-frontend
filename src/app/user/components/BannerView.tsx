import PixelEditor3 from "@/components/Pixel/PixelEditor3";

const BannerView = () => {
  return (
    <div className="relative mt8 mb-12 z-0">
      <div className=" absolute bottom-0 left-0 right-0 m-auto size-fit translate-y-1/2 z-10">
        <div className="w-[135px]  h-[137px] rounded-full overflow-hidden relative z-100">
          <PixelEditor3 rows={14} cols={14} />;
        </div>
      </div>
      <img
        className="h-[300px] md:h-[300px] lg:h-[300px]  object-cover z-0 w-full relative rounded-lg"
        src={"/assets/images/community-banner.png"}
        style={{
          backgroundPosition: "center",
        }}
        alt="reward-banner"
      />
    </div>
  );
};
export default BannerView;
