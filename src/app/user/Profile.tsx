"use client";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { useEffect, useState } from "react";
import BannerView from "./components/BannerView";
import History from "./components/History";
import Portfolio from "./components/Portfolio";

import { useGetUser, useGetUserByUsername } from "@/supabase/api/user/services";
import { shortenAddressOrEns } from "@/utils/address.ts";
import { FaCopy } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import SettingOutsideView from "./components/SettingOutsideView";
import { QRCode } from "react-qrcode-logo";

const categories: any = [
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
function getParameterTypeAndValue(params: any) {
  if (params.get("wallet")) {
    return { type: "wallet", value: params.get("wallet") };
  } else if (params.get("username")) {
    return { type: "username", value: params.get("username") };
  } else {
    return null;
  }
}
function Profile() {
  const searchParams = useSearchParams();
  const info = getParameterTypeAndValue(searchParams);
  const [tab, setTab] = useState(0);
  const handleCopy = () => {
    const element = document.createElement("textarea");
    element.value = `${wallet}`;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    toast.success("Wallet Copied");
  };
  const { data } = info?.type === "wallet" ? useGetUser(info?.value || "") : useGetUserByUsername(info?.value || "");
  const wallet = data?.wallet_address;
  useEffect(() => {
    if (wallet) localStorage.setItem("wallet", wallet);
  }, [wallet]);
  return (
    <div className="h-auto mt-3 mb-8">
      <BannerView />
      <div
        className="text-[1rem] md:text-[1.5rem] lg:text-[40px] mt-24 text-center font-bold flex items-center justify-center gap-2 md:gap-4 cursor-pointer"
        onClick={handleCopy}
      >
        <span>{shortenAddressOrEns(wallet as string, 16)}</span>
        <FaCopy />
      </div>
      <div className="text-center w-full">
        <QRCode value={"https://openguild-app-frontend.vercel.app/user?wallet=" + wallet} style={{ margin: "10px auto 10px" }} />
      </div>
      <div className="flex w-full pt-4 ">
        <TabGroup
          className="w-full overflow-hidden"
          onChange={(index) => {
            setTab(index);
          }}
        >
          <TabList className="flex gap-2 max-[450px] justify-center lg:justify-start">
            {categories.map(({ name }: any) => (
              <Tab
                key={name}
                className="rounded-full py-1 pr-4 lg:pr-10 font-semibold focus:outline-none data-[selected]:text-primary-color data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white text-nowrap text-sm lg:text-lg "
              >
                {name}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>

      {tab === 0 && <SettingOutsideView userInfo={data} />}
      {tab === 1 && <Portfolio />}
      {tab === 2 && <History />}
    </div>
  );
}

export default Profile;
