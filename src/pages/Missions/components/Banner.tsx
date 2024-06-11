import MissionBannerImg from "@assets/images/mission-banner.png";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute top-[35%] left-[10%] text-white text-[46px]">
        <span className="text-primary-color">Mission</span> System
      </div>
      <img className="h-[262px] md:h-[362px] lg:h-[462px] rounded-xl object-cover" src={MissionBannerImg} alt="mission-banner" />
    </div>
  );
}

export default Banner;
