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
function validateUsername(username: any) {
  const minLength = 0;
  const maxLength = 20;
  const regex = /^[a-zA-Z0-9_]+$/;

  if (username?.length === 0) return { isValid: true, message: "Username is valid" };

  if (typeof username !== "string") {
    return { isValid: false, message: "Username must be a string" };
  }

  if (username.length < minLength || username.length > maxLength) {
    return { isValid: false, message: `Username must be less than ${maxLength} characters` };
  }

  if (!regex.test(username)) {
    return { isValid: false, message: "Username can only contain alphanumeric characters and underscores" };
  }

  return { isValid: true, message: "Username is valid" };
}
function Settings({ userInfo }: any) {
  const account = useAccount();
  const handleCopy = () => {
    // const element: any = typeof document !== "undefined" && document?.createElement("textarea");
    // element.value = `${userInfo?.wallets[0]?.public_address}`;
    // typeof document !== "undefined" && document?.body.appendChild(element);
    // element.select();
    // typeof document !== "undefined" && document?.execCommand("copy");
    // typeof document !== "undefined" && document?.body.removeChild(element);
    // toast.success("Wallet Copied");
  };
  const { data } = useGetUser(account || "");
  const { mutate: updateUser } = useUpdateUser(account as any);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");

  useEffect(() => {
    setFirstName(data?.first_name as any);
    setLastName(data?.last_name as any);
    setUsername(data?.username as any);
    setTwitter(data?.twitter as any);
    setDiscord(data?.discord as any);
    setTelegram(data?.telegram as any);
  }, [data]);

  useEffect(() => {
    if (!data?.twitter && userInfo?.twitter_id) {
      handleUpdateTwitter(userInfo?.name);
      setTwitter(userInfo?.name);
    }
  }, [userInfo]);
  const handleUpdate = () => {
    updateUser(
      { first_name: firstName, last_name: lastName, email: data?.email, username: username, discord, telegram, twitter },
      {
        onSuccess: (resp) => {
          if (resp !== undefined) {
            toast.success("Update user successfully!");
          }
        },
      },
    );
  };
  const handleUpdateTwitter = (value: string) => {
    updateUser(
      { first_name: firstName, last_name: lastName, email: data?.email, username: username, discord, telegram, twitter: value },
      {},
    );
  };
  const [validUsername, setValidUsername] = useState({ isValid: true, message: "Username is valid" });
  useEffect(() => {
    const res = validateUsername(username);
    setValidUsername(res);
  }, [username]);
  return (
    <div>
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">General</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <div className="font-bold my-2">User ID</div>
          <SearchInput value={data?.id} disabled className="cursor-not-allowed" />
        </div>
        <div className="w-full">
          <div className="font-bold my-2">Username</div>
          <SearchInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={!validUsername.isValid ? "border-red-500" : ""}
          />
          {!validUsername.isValid && <div className="text-sm text-red-600">{(validUsername as any)?.message}</div>}
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
          {userInfo?.google_email ? (
            <div className="flex gap-2 items-center justify-center text-[#6b3ffd]">
              Email: @{userInfo?.google_email} <IoIosCheckmarkCircle color="#f226ef" />
            </div>
          ) : (
            <>@ Connect with email</>
          )}
        </div>

        {userInfo?.discord_email ? (
          <div className="px-8 py-3 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
            <div className="flex gap-2 items-center justify-center text-[#6b3ffd]">
              Discord: @{userInfo?.thirdparty_user_info?.user_info?.name} <IoIosCheckmarkCircle color="#f226ef" />
            </div>
          </div>
        ) : (
          <div className="w-full mt-4">
            <SearchInput placeholder="Input your @Discord account" value={discord} onChange={(e) => setDiscord(e.target.value)} />
          </div>
        )}

        {userInfo?.twitter_id ? (
          <div className="px-8 py-3 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
            <div className="flex gap-2 items-center justify-center text-[#6b3ffd]">
              Twitter: @{userInfo?.name} <IoIosCheckmarkCircle color="#f226ef" />
            </div>
          </div>
        ) : (
          <div className="w-full mt-4">
            <SearchInput placeholder="Input your @X account" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
          </div>
        )}
        <div className="w-full mt-4">
          <SearchInput placeholder="Input your @Telegram account" value={telegram} onChange={(e) => setTelegram(e.target.value)} />
        </div>
      </div>
      <Button
        className="py-1 px-4 h-[44px] w-full rounded-lg bg-primary-color text-white font-bold text-sm mt-10"
        onClick={() => handleUpdate()}
        disabled={!validUsername.isValid}
      >
        Update
      </Button>
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