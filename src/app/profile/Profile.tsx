"use client";
import Banner from "./components/Banner";

import { shortenAddressOrEns } from "@/utils/address.ts";
import { useAccount } from "@particle-network/connect-react-ui";
import { FaCopy } from "react-icons/fa6";
import Settings from "./components/Settings";
import { toast } from "react-toastify";

function Profile() {
  const account = useAccount();
  const handleCopy = () => {
    const element: any = typeof document !== "undefined" && document?.createElement("textarea");
    element.value = `${account}`;
    typeof document !== "undefined" && document?.body.appendChild(element);
    element.select();
    typeof document !== "undefined" && document?.execCommand("copy");
    typeof document !== "undefined" && document?.body.removeChild(element);
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
      <Settings />
    </div>
  );
}

export default Profile;
