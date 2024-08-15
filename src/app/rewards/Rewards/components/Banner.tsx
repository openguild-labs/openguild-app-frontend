import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative mt-8 mb-12">
      <div className="absolute m-auto inset-0 text-center size-fit">
        <div className="text-white text-[48px]">
          <span className="text-primary-color">Reward</span> Center
        </div>
        <div className="text-white text-[24px]">Game On, Get Award!</div>
      </div>
      <Image
        width={1068}
        height={300}
        className="h-[300px] md:h-[300px] lg:h-[300px]  object-cover z-0 w-full relative rounded-lg"
        src={"/assets/images/banner.webp"}
        style={{
          backgroundPosition: "center",
        }}
        alt="reward-banner"
      />
    </div>
  );
};
export default Banner;
