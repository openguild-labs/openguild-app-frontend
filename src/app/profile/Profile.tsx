"use client";
import Banner from "./components/Banner";

import Modal from "@/components/Modal";
import { useGetUser } from "@/supabase/api/user/services";
import { shortenAddressOrEns } from "@/utils/address.ts";
import { Button } from "@headlessui/react";
import { useAccount } from "@particle-network/connect-react-ui";
import clsx from "clsx";
import { useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { QRCode } from "react-qrcode-logo";
import { toast } from "react-toastify";
import Settings from "./components/Settings";

function Profile() {
  const account = useAccount();
  const [openModal, setOpenModal] = useState(false);

  const handleCopy = () => {
    const element: any = typeof document !== "undefined" && document?.createElement("textarea");
    element.value = `${account}`;
    typeof document !== "undefined" && document?.body.appendChild(element);
    element.select();
    typeof document !== "undefined" && document?.execCommand("copy");
    typeof document !== "undefined" && document?.body.removeChild(element);
    toast.success("Wallet Copied");
  };
  function getParameterTypeAndValue(search: string) {
    const params = new URLSearchParams(search);

    if (params.has("wallet")) {
      return { type: "wallet", value: params.get("wallet") };
    } else if (params.has("username")) {
      return { type: "username", value: params.get("username") };
    } else {
      return null;
    }
  }
  const info = getParameterTypeAndValue(location.search);
  const { data } = useGetUser(account || "");
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
      <Modal isActive={openModal} variant="custom" onCancel={() => setOpenModal(false)} className="bg-white p-4 w-auto">
        <div className="text-center w-full">
          <QRCode
            value={
              data?.username
                ? "https://app.openguild.wtf/user?username=" + data?.username
                : "https://app.openguild.wtf/user?wallet=" + account
            }
            style={{ margin: "10px auto 10px", width: "260px", height: "260px" }}
          />
        </div>
      </Modal>
      <div className="text-center w-full">
        <Button
          className={clsx(
            "transition-effect group text-black py-[10px] px-[14px] border rounded-lg text-xs flex items-center mx-auto mt-2",
            "bg-white border-primary-500 hover:text-primary-color hover:border-primary-color",
          )}
          onClick={() => setOpenModal(true)}
        >
          Show QR
        </Button>
      </div>
      <Settings />
    </div>
  );
}

export default Profile;
