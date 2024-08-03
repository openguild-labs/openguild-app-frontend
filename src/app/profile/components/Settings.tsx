import SearchInput from "@/components/SearchInput/SearchInput";
import { useGetUser, useUpdateUser } from "@/supabase/api/user/services";
import { shortenAddressOrEns } from "@/utils/address";
import { Button } from "@headlessui/react";
import { useAccount } from "@particle-network/connect-react-ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaDiscord } from "react-icons/fa";
import { DISCORD_INVITE_LINK } from "@/constants/discord";
import { findDiscordMemberFromList } from "@/app/api/callers";
import { CircularProgress } from "@mui/material";

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
    const element: any = typeof document !== "undefined" && document?.createElement("textarea");
    element.value = `${userInfo?.wallets[0]?.public_address}`;
    typeof document !== "undefined" && document?.body.appendChild(element);
    element.select();
    typeof document !== "undefined" && document?.execCommand("copy");
    typeof document !== "undefined" && document?.body.removeChild(element);
    toast.success("Wallet Copied");
  };

  const { data } = useGetUser(account || "");
  const { mutate: updateUser, isPending } = useUpdateUser(account as any);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [github, setGithub] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setFirstName(data?.first_name || "");
    setLastName(data?.last_name || "");
    setUsername(data?.username || "");
    setTwitter(data?.twitter || "");
    setDiscord(data?.discord || "");
    setGithub(data?.github || "");
  }, [data]);

  const handleUpdate = async () => {
    let newDiscord = data?.discord || "";
    let newDiscordID = data?.discord_id || "";

    if (discord == "") {
      newDiscord = "";
      newDiscordID = "";
    } else {
      setIsLoadingUpdate(true);
      const res = await findDiscordMemberFromList(discord);
      setIsLoadingUpdate(false);
      if (res === undefined) {
        toast.error("Discord member is invalid or you are not in our Discord guild!");
        setDiscord(data?.discord || "");
        return;
      } else if ("message" in res) {
        toast.error("Something went wrong, please try after " + res.retry_after + " seconds!");
        setDiscord(data?.discord || "");
        return;
      } else {
        newDiscord = res.user.username;
        newDiscordID = res.user.id;
      }
    }
    updateUser(
      {
        first_name: firstName,
        last_name: lastName,
        email: data?.email,
        username: username,
        discord: newDiscord,
        discord_id: newDiscordID,
        github: github,
        twitter,
      },
      {
        onSuccess: (resp) => {
          if (resp !== undefined) {
            toast.success("Update user successfully!");
          }
        },
      }
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
          <SearchInput isActive={true} value={String(data?.id || 0)} disabled className="cursor-not-allowed" />
        </div>
        <div className="w-full">
          <div className="font-bold my-2">Username</div>
          <SearchInput
            value={username}
            isActive={username !== ""}
            onChange={(e) => setUsername(e.target.value)}
            className={!validUsername.isValid ? "border-red-500" : ""}
          />
          {!validUsername.isValid && <div className="text-sm text-red-600">{(validUsername as any)?.message}</div>}
        </div>
        <div className="w-full">
          <div className="font-bold my-2">First Name</div>
          <SearchInput isActive={firstName !== ""} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="w-full">
          <div className="font-bold my-2">Last Name</div>
          <SearchInput isActive={lastName !== ""} value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>

      <div className="bg-white/10  w-full h-[1px] mt-0" />
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Social Accounts</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {mounted && (
          <div className="px-8 py-3 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-md mt-4">
            {userInfo?.google_email ? (
              <div className="flex gap-2 items-center justify-center text-primary-color">
                Email: @{userInfo?.google_email || ""} <IoIosCheckmarkCircle color="#f226ef" />
              </div>
            ) : (
              <div>@ Connect with email</div>
            )}
          </div>
        )}

        <div className="w-full mt-4 relative">
          <SearchInput
            isActive={discord !== ""}
            placeholder="Input your @Discord username"
            value={discord}
            onChange={(e) => {
              setDiscord(e.target.value);
            }}
          />
          <Link
            href={DISCORD_INVITE_LINK}
            target="_blank"
            className="transition-effect border text-primary-color px-3 py-1 rounded text-sm absolute right-3 top-1/2 -translate-y-1/2 border-primary-color hover:bg-primary-color hover:text-white flex items-center gap-x-1"
          >
            join our <FaDiscord size={20} />
          </Link>
        </div>

        <div className="w-full mt-4">
          <SearchInput
            isActive={twitter !== ""}
            placeholder="Input your @X account"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>

        <div className="w-full mt-4">
          <SearchInput
            isActive={github !== ""}
            placeholder="Input your @Github account"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
      </div>
      <Button
        className="py-1 px-4 h-[44px] w-full rounded-lg bg-primary-color text-white font-bold text-sm mt-10 flex items-center justify-center gap-x-2"
        onClick={() => handleUpdate()}
        disabled={!validUsername.isValid}
      >
        {(isLoadingUpdate || isPending) && <CircularProgress color="inherit" size={14} />}
        Update
      </Button>
      <div className="bg-white/10  w-full h-[1px] my-12" />
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Wallet List</div>
      <div className="p-4 border border-gray-100 bg-white rounded-lg shadow-lg">
        <div className="text-md font-semibold flex gap-2 items-center">
          EVM Chain
          <img src={"/assets/images/chains.png"} alt="chains" />
        </div>
        <div className="text-sm text-pink-500 mt-4 flex gap-2 items-center" onClick={handleCopy}>
          {shortenAddressOrEns(account as string, 16)} <IoCopyOutline className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Settings;
