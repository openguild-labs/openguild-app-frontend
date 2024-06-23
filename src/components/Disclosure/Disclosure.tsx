import { Disclosure as HeadlessDisclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import clsx from "clsx";

interface IDisclosureProps {
  title: React.ReactNode;
  description: string;
}

function Disclosure({ title, description }: IDisclosureProps) {
  const isEmptyDescription = description === "";
  return (
    <HeadlessDisclosure as="div" className="p-3 border border-gray-500/20 rounded-xl bg-white shadow-lg text-black" defaultOpen={false}>
      <DisclosureButton
        className={clsx("group flex w-full items-center gap-x-2", {
          "cursor-default": isEmptyDescription,
        })}
      >
        <BiSolidRightArrow
          className={clsx("transition-effect size-3", {
            "group-data-[open]:rotate-90": !isEmptyDescription,
          })}
          style={{
            fill: isEmptyDescription ? "#d4d4d4" : "#6b3ffd",
          }}
        />
        <div className="w-full flex items-center">{title}</div>
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
