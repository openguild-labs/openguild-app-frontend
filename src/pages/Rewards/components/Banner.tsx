import RewardBannerImg from "@assets/images/reward-banner.jpg";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute top-[35%] left-[40%] text-white text-[40px]">Reward Center</div>
      <img src={RewardBannerImg} alt="reward-banner" />
    </div>
  );
};
export default Banner;
