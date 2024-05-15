import MissionBannerImg from "@assets/images/mission-banner.png";

function Banner() {
  return (
    <div className="relative mt-10">
      <div className="absolute top-[35%] left-[10%] text-white text-[46px]">
        <span className="text-[#0fdbd1]">Mission</span> System
      </div>
      <img className="h-[462px] rounded-xl object-cover" src={MissionBannerImg} alt="mission-banner" />
    </div>
  );
}

export default Banner;
