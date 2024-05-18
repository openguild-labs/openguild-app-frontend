import { Button, ButtonProps } from "@headlessui/react";
import clsx from "clsx";

interface IViewMoreButtonProps extends ButtonProps {}

function ViewMoreButton({ className, ...props }: IViewMoreButtonProps) {
  return (
    <Button
      {...props}
      className={clsx(
        "py-1 px-4 w-[160px] h-[44px] rounded-lg bg-black text-primary-color border border-neutral-800 font-bold text-sm mt-6 hover:border-primary-color transition-effect",
        className
      )}
    >
      View More
    </Button>
  );
}

export default ViewMoreButton;
