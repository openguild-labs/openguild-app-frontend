import SearchInput from "@/components/SearchInput/SearchInput";
import chains from "@assets/images/chains.png";
import { IoCopyOutline } from "react-icons/io5";

function Settings() {
  return (
    <div>
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">General</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <div className="font-bold my-2">User ID</div>
          <SearchInput />
        </div>
        <div className="w-full">
          <div className="font-bold my-2">Username</div>
          <SearchInput />
        </div>
      </div>
      <div className="bg-white/10  w-full h-[1px] mt-8" />
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Social Accounts</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        <div className="px-8 py-2 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
          @ Connect with email
        </div>
        <div className="px-8 py-2 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
          @ Connect with Facebook
        </div>
        <div className="px-8 py-2 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">@ Connect with X</div>
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
        <div className="text-sm text-pink-500 mt-4 flex gap-2 items-center">
          0x55234...8234fec <IoCopyOutline className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Settings;
