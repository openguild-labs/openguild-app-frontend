import { IoMdShare } from "react-icons/io";
import { Button, ButtonProps } from "@headlessui/react";
import clsx from "clsx";

interface IShareButtonProps extends ButtonProps {}

function ShareButton({ className, ...props }: IShareButtonProps) {
  return (
    <Button
      {...props}
      className={clsx(
        "transition-effect group text-black py-[10px] px-[14px] border rounded-lg text-xs flex items-center",
        "bg-white border-primary-500 hover:text-primary-color hover:border-primary-color",
        className
      )}
    >
      <IoMdShare className="mr-2 text-base text-black group-hover:text-primary-color" />
      <div className="text">Share</div>
    </Button>
  );
}

export default ShareButton;
