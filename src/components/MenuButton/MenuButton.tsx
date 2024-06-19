import { MenuButton as HeadlessMenuButton, MenuButtonProps } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

interface IMenuButtonProps extends MenuButtonProps {
  label: string;
}

function MenuButton({ label }: IMenuButtonProps) {
  return (
    <HeadlessMenuButton className="shrink-0 transition-effect w-[196px] inline-flex items-center gap-2 rounded-lg border border-gray-300 py-3 px-4 text-sm/6 font-semibold text-black/80 data-[hover]:border-primary-color data-[selected]:border-primary-color white">
      <span className="w-full">{label}</span>
      <IoIosArrowDown className="size-4 fill-gray-500/60" />
    </HeadlessMenuButton>
  );
}

export default MenuButton;
