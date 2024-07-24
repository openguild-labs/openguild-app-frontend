import ShareButton from "@/components/ShareButton";
import Image from "next/image";

function Header() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4">
          <Image width={46} height={46} src={"/assets/images/game-avatar.png"} alt="avatar" className="rounded-full" />
          <span className="flex items-center text-sm">Ancient8</span>
        </div>
        <ShareButton />
      </div>
      <h1 className="text-[2rem] lg:text-[40px] leading-11 mt-4">Lucky Ticket to Share 100 Guaranteed Whitelists to FREE-MINT </h1>
    </div>
  );
}

export default Header;
