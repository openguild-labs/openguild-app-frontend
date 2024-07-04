import BannerImg from "@assets/images/banner.webp";

const Banner = () => {
  return (
    <div className="relative mt-8 mb-12">
      <div className="absolute m-auto inset-0 text-center size-fit">
        <div className="text-white text-[48px]">
          <span className="text-primary-color">Reward</span> Center
        </div>
        <div className="text-white text-[24px]">Game On, Get Award!</div>
      </div>
      <img
        className="h-[300px] md:h-[300px] lg:h-[300px]  object-cover z-0 w-full relative"
        src={BannerImg}
        style={{
          backgroundPosition: "center",
        }}
        alt="reward-banner"
      />
    </div>
  );
};
export default Banner;
