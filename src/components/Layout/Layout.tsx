import MyContext, { MyContextType } from "@/context/MyContext";
import { useCreateUser, useGetUser } from "@/supabase/api/user/services";
import logo from "@assets/images/logo.png";
import { useDisclosure } from "@mantine/hooks";
import { ConnectButton, useAccount, useConnectKit } from "@particle-network/connect-react-ui"; // @particle-network/connectkit to use Auth Core
import "@particle-network/connect-react-ui/dist/index.css";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { HEADER_HEIGHT } from "../../constants/dimensions";
import { MISSIONS_PATH, REWARDS_PATH } from "../../constants/links";
import PixelEditor2 from "../Pixel/PixelEditor2";
import "./Layout.css";

const linkItems = [
  {
    label: "Missions",
    to: MISSIONS_PATH,
  },
  {
    label: "Rewards",
    to: REWARDS_PATH,
  },
];

function Layout() {
  const navigate = useNavigate();
  const connectKit = useConnectKit();
  const userInfo = connectKit.particle.auth.getUserInfo();
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

  connectKit.on("disconnect", () => {
    navigate(MISSIONS_PATH);
  });

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

          <Link to={MISSIONS_PATH} className="flex items-center">
            <img src={logo} className="size-12 mr-3" />
            <h1 className="font-bold text-xl hidden min-[500px]:block">OpenGuild</h1>
          </Link>
        </div>
        <>
          <nav id="navbar">
            <ul className="hidden md:flex space-x-4">
              {linkItems.map((item) => {
                return (
                  <li key={item.to}>
                    <NavLink
                      style={{
                        height: HEADER_HEIGHT,
                      }}
                      className={({ isActive }) => clsx("font-medium text-[1.1rem]", isActive && "active")}
                      to={item.to}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex gap-4 items-center max-[1000px]:[&_.particle-account-info_>_span]:hidden">
            <ConnectButton />
            {account && (
              <div className="" onClick={() => navigate("/profile")}>
                <PixelEditor2 rows={14} cols={14} />
              </div>
            )}
          </div>
        </>

        {isSideMenuOpened && <div className="h-screen w-screen absolute top-0 left-0 bg-indigo-600/30" onClick={toggleSideMenu}></div>}
        <div
          className={clsx(
            "fixed top-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-[350px] left-0",
            !isSideMenuOpened && "-translate-x-full"
          )}
        >
          <Link to={MISSIONS_PATH}>
            <h1 className="font-bold text-xl p-4">OpenGuild</h1>
          </Link>
          <nav id="navbar">
            <ul className="flex flex-col gap-4 pl-6 pt-2">
              {linkItems.map((item) => {
                return (
                  <li key={item.to} className="w-fit !px-0 !mx-0">
                    <NavLink className={({ isActive }) => (isActive ? "active !px-0" : "!px-0")} to={item.to}>
                      {item.label}
                    </NavLink>
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
        <Outlet />
      </article>
    </main>
  );
}

export default Layout;
