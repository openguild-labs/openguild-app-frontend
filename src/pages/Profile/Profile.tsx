import { Tab, TabGroup, TabList } from "@headlessui/react";
import { useState } from "react";
import Banner from "./components/Banner";
import Portfolio from "./components/Portfolio";
import History from "./components/History";

import Settings from "./components/Settings";
import { useAccount } from "@particle-network/connect-react-ui";
import { shortenAddressOrEns } from "@/utils/address.ts";
import { FaCopy } from "react-icons/fa6";

const categories: TOption[] = [
  {
    name: "Account settings",
  },
  {
    name: "Portfolio",
  },
  {
    name: "History",
  },
];

function Profile() {
  const account = useAccount();

  const [tab, setTab] = useState(0);
  return (
    <div className="h-auto mt-3 mb-8">
      <Banner />
      <div className="text-[1rem] md:text-[1.5rem] lg:text-[40px] text-white mt-24 text-center font-bold flex items-center justify-center gap-2 md:gap-4">
        <span>
          {shortenAddressOrEns(account as string, 16)}
        </span>
        <FaCopy />
      </div>

      <div className="flex w-full pt-4 ">
          <TabGroup
            className="w-full overflow-hidden"
            onChange={(index) => {
              setTab(index);
            }}
          >
            <TabList className="flex gap-2 max-[450px]:animate-marquee">
              {categories.map(({ name }) => (
                <Tab
                  key={name}
                  className="rounded-full py-1 px-5 text-md/6 font-semibold text-white focus:outline-none data-[selected]:text-primary-color data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white text-nowrap"
                >
                  {name}
                </Tab>
              ))}
            </TabList>
          </TabGroup>
      </div>
      {tab === 0 && <Settings />}
      {tab === 1 && <Portfolio />}
      {tab === 2 && <History />}
    </div>
  );
}

export default Profile;
