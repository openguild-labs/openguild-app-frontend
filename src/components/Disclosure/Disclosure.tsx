import { Disclosure as HeadlessDisclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BiSolidRightArrow } from "react-icons/bi";

function Disclosure() {
  return (
    <HeadlessDisclosure as="div" className="p-3 border border-neutral-800 rounded-xl bg-[#0d0f11]" defaultOpen={false}>
      <DisclosureButton className="group flex w-full items-center">
        <BiSolidRightArrow className="transition-effect size-3 fill-primary-color group-data-[open]:rotate-90" />
        <span className="text-base font-bold ml-2 text-white">Complete Nakame’s Onboarding Platform (Earn 100 CHEESE)</span>
      </DisclosureButton>
      <DisclosurePanel className="origin-top transition">
        <div className="p-[6px] pt-3 text-sm border-t border-neutral-800 mt-3">
          <p>
            🚨 <strong>NOTE: Use the Twitter Account that's the same as the one you have connected to Space3.</strong>
          </p>
          <p>
            1️⃣ Access{" "}
            <a href="https://chat.nakame.social/onboarding" rel="nofollow" target="_blank">
              Nakame Platform
            </a>{" "}
            &amp; sign up by Twitter 2️⃣ Comple MEE/TASKEES or use MEE/CHAT to earn 100 CHEESE
          </p>
        </div>
      </DisclosurePanel>
    </HeadlessDisclosure>
  );
}

export default Disclosure;
