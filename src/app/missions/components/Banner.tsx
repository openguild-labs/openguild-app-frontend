function Banner() {
  return (
    <div className="relative mt-8 mb-12">
      <div className="absolute top-[35%] left-[10%] text-white text-[46px]">
        <span className="text-primary-color">Mission</span> System
      </div>
      <img
        className="h-[300px] md:h-[300px] lg:h-[300px]  object-cover z-0 w-full relative rounded-lg"
        src={"/assets/images/banner.webp"}
        style={{
          backgroundPosition: "center",
        }}
        alt="reward-banner"
      />
    </div>
  );
}

export default Banner;
