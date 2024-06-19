import { IoMdShare } from "react-icons/io";
import { Button, ButtonProps } from "@headlessui/react";
import clsx from "clsx";

interface IShareButtonProps extends ButtonProps {}

function ShareButton({ className, ...props }: IShareButtonProps) {
  return (
    <Button {...props} className={clsx("text-black py-[10px] px-[14px] bg-white border-primary-500 border rounded-lg text-xs flex items-center hover:text-pink-500 hover:border-pink-500", className)}>
      <IoMdShare className="mr-2 text-base text-black" />
      <div className="text">Share</div>
    </Button>
  );
}

export default ShareButton;
