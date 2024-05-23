import SearchInput from "@/components/SearchInput/SearchInput";
import chains from "@assets/images/chains.png";
import { IoCopyOutline } from "react-icons/io5";

function Settings() {
  return (
    <div>
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">General</div>
      <div className="flex items-center justify-between gap-8">
        <div className="w-full">
          <div className="font-bold text-[#ffffff73] my-2">User ID</div>
          <SearchInput />
        </div>
        <div className="w-full">
          <div className="font-bold text-[#ffffff73] my-2">Username</div>
          <SearchInput />
        </div>
      </div>
      <div className="bg-white/10  w-full h-[1px] mt-8" />
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Social Accounts</div>

      <div className="grid grid-cols-2 gap-x-12">
        <div className="px-8 py-2 bg-[#151617] text-white text-center cursor-pointer font-semibold rounded-md mt-4">
          @ Connect with email
        </div>
        <div className="px-8 py-2 bg-[#151617] text-white text-center cursor-pointer font-semibold rounded-md mt-4">
          @ Connect with Facebook
        </div>
        <div className="px-8 py-2 bg-[#151617] text-white text-center cursor-pointer font-semibold rounded-md mt-4">@ Connect with X</div>
        <div className="px-8 py-2 bg-[#151617] text-white text-center cursor-pointer font-semibold rounded-md mt-4">
          @ Connect with Telegram
        </div>
      </div>
      <div className="bg-white/10  w-full h-[1px] my-12" />
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Wallet List</div>
      <div className="rounded-md p-4 border border-white/10 w-1/2">
        <div className="text-md font-semibold text-white flex gap-2 items-center">
          EVM Chain
          <img src={chains} alt="chains" />
        </div>
        <div className="text-sm text-[#ffffff73] mt-4 flex gap-2 items-center">
          0x55234...8234fec <IoCopyOutline className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Settings;
