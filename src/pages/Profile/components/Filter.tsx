import MenuButton from "@/components/MenuButton";
import { Checkbox, Menu, MenuItems, Transition } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";

export default function Filter() {
  return (
    <Menu>
      <MenuButton label="Sort & Filter" />
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="w-[250px] origin-top-right rounded-xl border border-white/5 bg-black shadow-sm p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
        >
          <div className="text-md font-semibold text-white/30 mt-1 ml-2">Sort</div>
          <div>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <Checkbox className="group size-5 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white">
                <FaCheck className="hidden fill-black group-data-[checked]:block" />
              </Checkbox>
              Latest
            </button>
          </div>
          <div>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <Checkbox className="group size-5 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white">
                <FaCheck className="hidden fill-black group-data-[checked]:block" />
              </Checkbox>
              Top Trending{" "}
            </button>
          </div>
          <div className="my-1 h-px bg-white/5" />
          <div className="text-md font-semibold text-white/30 mt-2 ml-2">Blockchain</div>

          <div>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <Checkbox className="group size-5 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white">
                <FaCheck className="hidden fill-black group-data-[checked]:block" />
              </Checkbox>
              Ethereum{" "}
            </button>
          </div>
          <div>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <Checkbox className="group size-5 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white">
                <FaCheck className="hidden fill-black group-data-[checked]:block" />
              </Checkbox>
              Solana{" "}
            </button>
          </div>
          <div>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <Checkbox className="group size-5 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white">
                <FaCheck className="hidden fill-black group-data-[checked]:block" />
              </Checkbox>
              BNB{" "}
            </button>
          </div>
          <div>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <Checkbox className="group size-5 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white">
                <FaCheck className="hidden fill-black group-data-[checked]:block" />
              </Checkbox>
              Polygon{" "}
            </button>
          </div>
          <div>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <Checkbox className="group size-5 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white">
                <FaCheck className="hidden fill-black group-data-[checked]:block" />
              </Checkbox>
              Polkadot{" "}
            </button>
          </div>
          <div>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <Checkbox className="group size-5 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white">
                <FaCheck className="hidden fill-black group-data-[checked]:block" />
              </Checkbox>
              Base{" "}
            </button>
          </div>
          <div>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <Checkbox className="group size-5 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white">
                <FaCheck className="hidden fill-black group-data-[checked]:block" />
              </Checkbox>
              Optimism{" "}
            </button>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
