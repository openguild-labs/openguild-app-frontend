"use client";
export const dynamic = "force-dynamic";

import MyContext, { MyContextType } from "@/context/MyContext";
import { useCreateUser, useGetUser } from "@/supabase/api/user/services";
import { useDisclosure } from "@mantine/hooks";
import { ConnectButton, useAccount, useConnectKit } from "@particle-network/connect-react-ui"; // @particle-network/connectkit to use Auth Core
import "@particle-network/connect-react-ui/dist/index.css";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { HEADER_HEIGHT } from "../../constants/dimensions";
import { MISSIONS_PATH, REWARDS_PATH, QUESTS_PATH, MEMBERS_PATH } from "../../constants/links";
import PixelEditor2 from "../Pixel/PixelEditor2";
import "./Layout.css";
import Image from "next/image";
const linkItems = [
  {
    label: "Missions",
    to: MISSIONS_PATH,
  },
  {
    label: "Rewards",
    to: REWARDS_PATH,
  },
  {
    label: "Quests",
    to: QUESTS_PATH,
  },
  {
    label: "Members",
    to: MEMBERS_PATH,
  },
];

function Layout({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const connectKit = useConnectKit();
  const userInfo = connectKit?.particle?.auth?.getUserInfo();
  const account = useAccount();
  const { mutate: createUser } = useCreateUser();
  const { data, isFetched } = useGetUser(account || "");
  const context = useContext(MyContext);
  const [isSideMenuOpened, { toggle: toggleSideMenu }] = useDisclosure(false);
  const { setValue } = context as MyContextType;

  const addUserToDB = async () => {
    await createUser({
      email: userInfo?.email || userInfo?.google_email || "",
      wallet_address: userInfo?.wallets[0]?.public_address || "",
      first_name: "",
      last_name: "",
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      setValue(data);
    }

    if (data === undefined && isFetched) {
      addUserToDB();
    }
  }, [account, data]);
  try {
    connectKit &&
      connectKit?.on("disconnect", () => {
        router.push(MISSIONS_PATH);
      });
  } catch (error) {
    console.log({ error });
  }

  return (
    <main className="bg-white min-h-screen pb-12">
      <header
        className="backdrop-blur-md bg-white/80 flex items-center px-4 md:px-9 fixed top-0 right-0 left-0 shadow-xs shadow-neutral-100 z-10 text-black"
        style={{
          height: HEADER_HEIGHT,
          justifyContent: "space-between",
        }}
      >
        <div className="flex items-center">
          <button className="inline-block md:hidden size-10" type="button" onClick={toggleSideMenu}>
            <FiMenu className="size-6" />
          </button>

          <Link href={MISSIONS_PATH} className="flex items-center">
            <Image width={48} height={48} alt="logo" src={"/assets/images/logo.png"} className="mr-3" />
            <h1 className="font-bold text-xl hidden min-[500px]:block">OpenGuild</h1>
          </Link>
        </div>
        <>
          <nav id="navbar">
            <ul className="hidden md:flex space-x-4">
              {linkItems.map((item) => {
                const isActive = pathname.includes(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      style={{
                        height: HEADER_HEIGHT,
                      }}
                      className={clsx("font-medium text-[1.1rem]", isActive && "active")}
                      href={item.to}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex gap-4 items-center max-[1000px]:[&_.particle-account-info_>_span]:hidden">
            <ConnectButton />
            {account && (
              <div className="" onClick={() => router.push("/profile")}>
                <PixelEditor2 rows={14} cols={14} />
              </div>
            )}
          </div>
        </>

        {isSideMenuOpened && <div className="h-screen w-screen absolute top-0 left-0 bg-indigo-600/30" onClick={toggleSideMenu}></div>}
        <div
          className={clsx(
            "fixed top-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-[350px] left-0",
            !isSideMenuOpened && "-translate-x-full",
          )}
        >
          <Link href={MISSIONS_PATH}>
            <h1 className="font-bold text-xl p-4">OpenGuild</h1>
          </Link>
          <nav id="navbar">
            <ul className="flex flex-col gap-4 pl-6 pt-2">
              {linkItems.map((item) => {
                return (
                  <li key={item.to} className="w-fit !px-0 !mx-0">
                    <Link href={item.to}>{item.label}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
      <article
        className="container mx-auto max-w-[1140px] px-9"
        style={{
          paddingTop: HEADER_HEIGHT,
        }}
      >
        {children}
      </article>
    </main>
  );
}

export default Layout;
