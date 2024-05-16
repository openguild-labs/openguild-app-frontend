import RewardBannerImg from "@assets/images/reward-banner.jpg";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute top-[35%] left-[39%] text-center ">
        <div className="text-white text-[48px]">
          <span className="text-[#ff7300]">Reward</span> Center
        </div>
        <div className="text-white text-[24px]">Game On, Get Award!</div>
      </div>

      <img className="h-[462px] rounded-xl object-cover" src={RewardBannerImg} alt="reward-banner" />
    </div>
  );
};
export default Banner;
