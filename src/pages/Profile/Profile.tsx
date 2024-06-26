import { Tab, TabGroup, TabList } from "@headlessui/react";
import { useConnectKit } from "@particle-network/connect-react-ui"; // @particle-network/connectkit to use Auth Core
import { useState } from "react";
import Banner from "./components/Banner";
import History from "./components/History";
import Portfolio from "./components/Portfolio";

import { shortenAddressOrEns } from "@/utils/address.ts";
import { useAccount } from "@particle-network/connect-react-ui";
import { FaCopy } from "react-icons/fa6";
import { toast } from "react-toastify";
import Settings from "./components/Settings";

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
  const connectKit = useConnectKit();
  const userInfo = connectKit.particle.auth.getUserInfo();
  const [tab, setTab] = useState(0);
  const handleCopy = () => {
    const element = document.createElement("textarea");
    element.value = `${userInfo?.wallets[0]?.public_address}`;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    toast.success("Wallet Copied");
  };
  return (
    <div className="h-auto mt-3 mb-8">
      <Banner />
      <div
        className="text-[1rem] md:text-[1.5rem] lg:text-[40px] mt-24 text-center font-bold flex items-center justify-center gap-2 md:gap-4 cursor-pointer"
        onClick={handleCopy}
      >
        <span>{shortenAddressOrEns(account as string, 16)}</span>
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
                className="rounded-full py-1 px-5 text-md/6 font-semibold focus:outline-none data-[selected]:text-primary-color data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white text-nowrap"
              >
                {name}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>
      {tab === 0 && <Settings userInfo={userInfo} />}
      {tab === 1 && <Portfolio />}
      {tab === 2 && <History />}
    </div>
  );
}

export default Profile;
