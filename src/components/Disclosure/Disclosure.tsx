import { Disclosure as HeadlessDisclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import EllipsisTypo from "../EllipsisTypo";

interface IDisclosureProps {
  title: React.ReactNode;
  description: string;
}

function Disclosure({ title, description }: IDisclosureProps) {
  const isEmptyDescription = description === "";
  return (
    <HeadlessDisclosure as="div" className="p-3 border border-gray-500/20 rounded-xl bg-white shadow-lg text-black" defaultOpen={false}>
      <DisclosureButton className="group flex w-full items-center gap-x-2">
        {!isEmptyDescription && <BiSolidRightArrow className="transition-effect size-3 fill-primary-color group-data-[open]:rotate-90" />}
        <EllipsisTypo text={title} />
      </DisclosureButton>
      {!isEmptyDescription && (
        <DisclosurePanel className="origin-top transition">
          <pre className="p-[6px] pt-3 text-sm text-wrap border-t border-neutral-800 mt-3">{description}</pre>
        </DisclosurePanel>
      )}
    </HeadlessDisclosure>
  );
}

export default Disclosure;
