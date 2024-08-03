import SearchInput from "@/components/SearchInput/SearchInput";
import { useGetUser, useUpdateUser } from "@/supabase/api/user/services";
import { shortenAddressOrEns } from "@/utils/address";
import { useAccount } from "@particle-network/connect-react-ui";
import { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaDiscord } from "react-icons/fa";
import { searchDiscordMember } from "@/app/api/callers";
import { Button, CircularProgress } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { CiFacebook } from "react-icons/ci";
import { RiTwitterXLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";

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
  const [facebook, setFacebook] = useState("");
  const [github, setGithub] = useState("");
  const [validUsername, setValidUsername] = useState({ isValid: true, message: "Username is valid" });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session } = useSession();

  const handleUpdate = async () => {
    updateUser(
      {
        first_name: firstName,
        last_name: lastName,
        email: data?.email,
        username: username,
        github: github,
        facebook: facebook,
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

  const handleUpdateDiscord = async (username: string, onSuccess?: () => void) => {
    if (username === "") {
      return;
    }

    const res = await searchDiscordMember(username);
    if (res.length !== 1) {
      toast.error("Discord member not found");
      return;
    }

    updateUser(
      {
        discord: res[0].user.username,
        discord_id: res[0].user.id,
      },
      {
        onSuccess,
      }
    );
  };

  useEffect(() => {
    if (session !== undefined && session !== null && data !== undefined && data.discord === "") {
      handleUpdateDiscord(session.user?.name || "", () => {
        setDiscord(session.user?.name || "");
      });
    }
  }, [session, data]);

  useEffect(() => {
    setFirstName(data?.first_name || "");
    setLastName(data?.last_name || "");
    setUsername(data?.username || "");
    setTwitter(data?.twitter || "");
    setDiscord(data?.discord || "");
    setGithub(data?.github || "");
    setFacebook(data?.facebook || "");
  }, [data]);

  useEffect(() => {
    const res = validateUsername(username);
    setValidUsername(res);
  }, [username]);

  return (
    <div>
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">General</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <div className="font-bold my-2">Email</div>
          {mounted ? (
            <div className="px-8 py-3 bg-white border border-primary-color text-center cursor-pointer font-semibold rounded-lg">
              {userInfo?.google_email && (
                <div className="flex gap-2 items-center justify-center text-primary-color">
                  {userInfo?.google_email || ""} <IoIosCheckmarkCircle color="#f226ef" />
                </div>
              )}
            </div>
          ) : (
            <div className="h-[50px] bg-white border border-neutral-300 text-center cursor-pointer font-semibold rounded-lg"></div>
          )}
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
        <div className="w-full mt-4 relative">
          {discord === "" ? (
            <Button className="h-[50px] w-full rounded-lg" variant="outlined" onClick={() => signIn("discord")}>
              <span className="flex items-center normal-case gap-x-2">
                <FaDiscord size={20} />
                OAuth via Discord
              </span>
            </Button>
          ) : (
            <div className="h-[50px] bg-white border border-primary-color flex items-center justify-center rounded-lg relative">
              <span className="flex gap-2 items-center justify-center text-primary-color">
                <FaDiscord size={20} className="absolute left-4 top-1/2 -translate-y-1/2" /> @{discord}{" "}
                <IoIosCheckmarkCircle color="#f226ef" />
              </span>
            </div>
          )}
        </div>

        <div className="w-full mt-4">
          <SearchInput
            icon={<CiFacebook size={20} />}
            isActive={facebook !== ""}
            placeholder="Input your @Facebook account"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </div>

        <div className="w-full mt-4">
          <SearchInput
            icon={<RiTwitterXLine size={16} />}
            isActive={twitter !== ""}
            placeholder="Input your @X account"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>

        <div className="w-full mt-4">
          <SearchInput
            icon={<FaGithub size={20} />}
            isActive={github !== ""}
            placeholder="Input your @Github account"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
      </div>
      <Button
        variant="contained"
        className="py-1 px-4 h-[44px] w-full mt-10 rounded-lg"
        onClick={() => handleUpdate()}
        disabled={!validUsername.isValid}
      >
        <span className="flex items-center gap-x-1 capitalize">
          {isPending && <CircularProgress color="inherit" size={14} />}
          Update
        </span>
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
