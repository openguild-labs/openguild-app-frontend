import RewardBannerImg from "@assets/images/reward-banner.jpg";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute m-auto inset-0 text-center size-fit">
        <div className="text-white text-[48px]">
          <span className="text-[#ff7300]">Reward</span> Center
        </div>
        <div className="text-white text-[24px]">Game On, Get Award!</div>
      </div>

      <img className="h-[262px] md:h-[362px] lg:h-[462px] rounded-xl object-cover" src={RewardBannerImg} alt="reward-banner" />
    </div>
  );
};
export default Banner;
