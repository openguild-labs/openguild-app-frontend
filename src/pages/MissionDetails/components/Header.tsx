import avatar from "@assets/images/game-avatar.png";
import { IoMdShare } from "react-icons/io";
import { Button } from "@headlessui/react";

function Header() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4">
          <img src={avatar} alt="avatar" className="w-[46px] h-[46px] rounded-full" />
          <span className="flex items-center text-sm">Ancient8</span>
        </div>
        <Button className="py-[10px] px-[14px] bg-[#151b21] rounded-lg text-xs flex items-center">
          <IoMdShare className="mr-2 text-base text-primary-color" />
          Share
        </Button>
      </div>
      <h1 className="text-[38px] mt-4">Onboarding to Nakame Social</h1>
    </div>
  );
}

export default Header;
