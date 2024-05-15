import { MenuButton as HeadlessMenuButton, MenuButtonProps } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

interface IMenuButtonProps extends MenuButtonProps {
  label: string;
}

function MenuButton({ label }: IMenuButtonProps) {
  return (
    <HeadlessMenuButton className="shrink-0 transition-effect w-[196px] inline-flex items-center gap-2 rounded-lg border border-neutral-700 py-3 px-4 text-sm/6 font-semibold text-white data-[hover]:border-[#0fdbd1] data-[selected]:border-[#0fdbd1]">
      <span className="w-full">{label}</span>
      <IoIosArrowDown className="size-4 fill-white/60" />
    </HeadlessMenuButton>
  );
}

export default MenuButton;
