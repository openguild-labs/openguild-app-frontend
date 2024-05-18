import { IoMdShare } from "react-icons/io";
import { Button, ButtonProps } from "@headlessui/react";
import clsx from "clsx";

interface IShareButtonProps extends ButtonProps {}

function ShareButton({ className, ...props }: IShareButtonProps) {
  return (
    <Button {...props} className={clsx("py-[10px] px-[14px] bg-[#151b21] rounded-lg text-xs flex items-center", className)}>
      <IoMdShare className="mr-2 text-base text-primary-color" />
      Share
    </Button>
  );
}

export default ShareButton;
