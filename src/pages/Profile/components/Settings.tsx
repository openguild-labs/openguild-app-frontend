import SearchInput from "@/components/SearchInput/SearchInput";
import { useGetUser, useUpdateUser } from "@/supabase/api/user/services";
import { shortenAddressOrEns } from "@/utils/address";
import chains from "@assets/images/chains.png";
import { Button } from "@headlessui/react";
import { useAccount } from "@particle-network/connect-react-ui";
import { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";

function Settings({ userInfo }: any) {
  const account = useAccount();
  const handleCopy = () => {
    const element = document.createElement("textarea");
    element.value = `${userInfo?.wallets[0]?.public_address}`;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    toast.success("Wallet Copied");
  };
  const { data } = useGetUser(account || "");
  const { mutate: updateUser } = useUpdateUser(account as any);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    setFirstName(data?.first_name as any);
    setLastName(data?.last_name as any);
  }, [data]);
  const handleUpdate = () => {
    updateUser({ first_name: firstName, last_name: lastName, email: data?.email } as any);
    toast.success("Update user successfully!");
  };
  console.log({ data });
  return (
    <div>
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">General</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <div className="font-bold my-2">User ID</div>
          <SearchInput value={userInfo?.uuid} />
        </div>
        <div className="w-full">
          <div className="font-bold my-2">Username</div>
          <SearchInput />
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
      <Button
        className="py-1 px-4 h-[44px] w-full rounded-lg border border-primary-color text-primary-color font-bold text-sm mt-6"
        onClick={() => handleUpdate()}
      >
        Update
      </Button>
      <div className="bg-white/10  w-full h-[1px] mt-8" />
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Social Accounts</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        <div className="px-8 py-2 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
          {userInfo?.google_email ? (
            <div className="flex gap-2 items-center justify-center text-[#6b3ffd]">
              Email: @{userInfo?.google_email} <IoIosCheckmarkCircle color="#f226ef" />
            </div>
          ) : (
            <>@ Connect with email</>
          )}
        </div>
        <div className="px-8 py-2 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
          {userInfo?.discord_email ? (
            <div className="flex gap-2 items-center justify-center text-[#6b3ffd]">
              Discord: @{userInfo?.thirdparty_user_info?.user_info?.name} <IoIosCheckmarkCircle color="#f226ef" />
            </div>
          ) : (
            <>@ Connect with email</>
          )}
        </div>
        <div className="px-8 py-2 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
          {userInfo?.twitter_id ? (
            <div className="flex gap-2 items-center justify-center text-[#6b3ffd]">
              Twitter: @{userInfo?.name} <IoIosCheckmarkCircle color="#f226ef" />
            </div>
          ) : (
            <>@ Connect with X</>
          )}
        </div>
        <div className="px-8 py-2 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
          @ Connect with Telegram
        </div>
      </div>
      <div className="bg-white/10  w-full h-[1px] my-12" />
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Wallet List</div>
      <div className="p-4 border border-gray-100 bg-white rounded-lg shadow-lg">
        <div className="text-md font-semibold flex gap-2 items-center">
          EVM Chain
          <img src={chains} alt="chains" />
        </div>
        <div className="text-sm text-pink-500 mt-4 flex gap-2 items-center" onClick={handleCopy}>
          {shortenAddressOrEns(account as string, 16)} <IoCopyOutline className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Settings;
