import SearchInput from "@/components/SearchInput/SearchInput";
import { shortenAddressOrEns } from "@/utils/address";
import chains from "@assets/images/chains.png";
import { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";

function SettingOutsideView({ userInfo }: any) {
  const handleCopy = () => {
    const element = document.createElement("textarea");
    element.value = `${userInfo?.wallets[0]?.public_address}`;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    toast.success("Wallet Copied");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");

  useEffect(() => {
    setFirstName(userInfo?.first_name as any);
    setLastName(userInfo?.last_name as any);
    setUsername(userInfo?.username as any);
    setTwitter(userInfo?.twitter as any);
    setDiscord(userInfo?.discord as any);
    setTelegram(userInfo?.telegram as any);
  }, [userInfo]);
  return (
    <div>
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">General</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <div className="font-bold my-2">User ID</div>
          <SearchInput value={userInfo?.id} disabled className="cursor-not-allowed" />
        </div>
        <div className="w-full">
          <div className="font-bold my-2">Username</div>
          <SearchInput value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="w-full">
          <div className="font-bold my-2">First Name</div>
          <SearchInput value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="w-full">
          <div className="font-bold my-2">Last Name</div>
          <SearchInput value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>

      <div className="bg-white/10  w-full h-[1px] mt-0" />
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Social Accounts</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        <div className="px-8 py-3 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
          {userInfo?.email ? (
            <div className="flex gap-2 items-center justify-center text-[#6b3ffd]">
              Email: @{userInfo?.email} <IoIosCheckmarkCircle color="#f226ef" />
            </div>
          ) : (
            <>@ Connect with email</>
          )}
        </div>

        {userInfo?.discord ? (
          <div className="px-8 py-3 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
            <div className="flex gap-2 items-center justify-center text-[#6b3ffd]">
              Discord: @{userInfo?.discord} <IoIosCheckmarkCircle color="#f226ef" />
            </div>
          </div>
        ) : (
          <div className="w-full mt-4">
            <SearchInput disabled placeholder=" @Discord account" value={discord} onChange={(e) => setDiscord(e.target.value)} />
          </div>
        )}

        {userInfo?.twitter ? (
          <div className="px-8 py-3 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
            <div className="flex gap-2 items-center justify-center text-[#6b3ffd]">
              Twitter: @{userInfo?.twitter} <IoIosCheckmarkCircle color="#f226ef" />
            </div>
          </div>
        ) : (
          <div className="w-full mt-4">
            <SearchInput disabled placeholder=" @X account" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
          </div>
        )}
        {userInfo?.telegram ? (
          <div className="px-8 py-3 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
            <div className="flex gap-2 items-center justify-center text-[#6b3ffd]">
              Telegram: @{userInfo?.telegram} <IoIosCheckmarkCircle color="#f226ef" />
            </div>
          </div>
        ) : (
          <div className="w-full mt-4">
            <SearchInput disabled placeholder=" @Telegram account" value={telegram} onChange={(e) => setTwitter(e.target.value)} />
          </div>
        )}
      </div>
      <div className="bg-white/10  w-full h-[1px] my-12" />
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Wallet List</div>
      <div className="p-4 border border-gray-100 bg-white rounded-lg shadow-lg">
        <div className="text-md font-semibold flex gap-2 items-center">
          EVM Chain
          <img src={chains} alt="chains" />
        </div>
        <div className="text-sm text-pink-500 mt-4 flex gap-2 items-center" onClick={handleCopy}>
          {shortenAddressOrEns(userInfo?.wallet_address as string, 16)} <IoCopyOutline className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default SettingOutsideView;
