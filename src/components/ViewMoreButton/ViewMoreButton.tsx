import { Button, ButtonProps } from "@headlessui/react";
import clsx from "clsx";

interface IViewMoreButtonProps extends ButtonProps {}

function ViewMoreButton({ className, ...props }: IViewMoreButtonProps) {
  return (
    <Button
      {...props}
      className={clsx(
        "py-1 px-4 w-[160px] h-[44px] rounded-lg bg-white text-primary-color border border-primary-color font-bold text-sm mt-6 hover:text-pink-500 hover:border-pink-500 transition-effect",
        className
      )}
    >
      View More
    </Button>
  );
}

export default ViewMoreButton;
