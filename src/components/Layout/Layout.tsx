import { useCreateUser, useGetUser } from "@/supabase/api/user/services";
import profile from "@assets/images/profile.svg";
import { ConnectButton, useAccount, useConnectKit } from "@particle-network/connect-react-ui"; // @particle-network/connectkit to use Auth Core
import "@particle-network/connect-react-ui/dist/index.css";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { HEADER_HEIGHT } from "../../constants/dimensions";
import { COLLECTIONS_PATH, HOME_PATH, MISSIONS_PATH, REWARDS_PATH } from "../../constants/links";
import CustomDialog from "../CustomDialog/CustomDialog";
import "./Layout.css";
import MyContext from "@/context/MyContext";
import { FiMenu } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";

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
    label: "Collections",
    to: COLLECTIONS_PATH,
  },
];

function Layout() {
  const location = useLocation();
  const isHomePath = location.pathname === HOME_PATH;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const connectKit = useConnectKit();
  const userInfo = connectKit.particle.auth.getUserInfo();
  const account = useAccount();
  const { mutate: createUser } = useCreateUser();
  const { data, isFetching } = useGetUser(account || "");
  const context = useContext(MyContext as any);
  const [isSideMenuOpened, { toggle: toggleSideMenu }] = useDisclosure(false);

  const addUserToDB = async () => {
    await createUser({
      email: userInfo?.email || userInfo?.google_email || "",
      wallet_address: userInfo?.wallets[0]?.public_address || "",
      first_name: "",
      last_name: "",
    });
  };
  useEffect(() => {
    if (!data && !isFetching) addUserToDB();
  }, [account]);
  const { setValue }: any = context;

  useEffect(() => {
    setValue(data);
  }, [data]);

  return (
    <main className="bg-[#28123E] min-h-screen pb-12">
      <header
        className="flex items-center px-4 md:px-9 fixed top-0 right-0 left-0 bg-[#fff] shadow-xs shadow-neutral-100 z-10 text-black"
        style={{
          height: HEADER_HEIGHT,
          justifyContent: isHomePath ? "center" : "space-between",
          marginRight: isDialogOpen ? "14px" : "0"
        }}
      >
        <div className="flex items-center">
          <button className="inline-block md:hidden size-10" type="button" onClick={toggleSideMenu}>
            <FiMenu className="size-6" />
          </button>
          <Link to={MISSIONS_PATH}>
            <h1 className="font-bold text-xl ">ChainCohort</h1>
          </Link>
        </div>
        {!isHomePath && (
          <>
            <nav id="navbar">
              <ul className="hidden md:flex space-x-4">
                {linkItems.map((item) => {
                  return (
                    <li key={item.to}>
                      <NavLink
                        style={{
                          height: HEADER_HEIGHT
                        }}
                        className={({ isActive }) => (isActive ? "active" : "")}
                        to={item.to}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <CustomDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
            <div className="flex gap-4 items-center [&_.particle-connect-wallet-btn]:bg-gradientPrimary">
              <ConnectButton />
              {account && <img src={profile} alt="profile" className="w-8 h-8 cursor-pointer" onClick={() => navigate("/profile")} />}
            </div>
          </>
        )}

        {isSideMenuOpened && <div className="h-screen w-screen absolute top-0 left-0 bg-indigo-600/30" onClick={toggleSideMenu}></div>}
        <div
          className={clsx("z-10 fixed top-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-[350px] dark:bg-gray-800 left-0", !isSideMenuOpened && '-translate-x-full')}>
          <Link to={MISSIONS_PATH}>
            <h1 className="font-bold text-xl p-4">ChainCohort</h1>
          </Link>
          <nav id="navbar">
            <ul className="flex flex-col gap-4 pl-6 pt-2">
              {linkItems.map((item) => {
                return (
                  <li key={item.to} className="w-fit !px-0 !mx-0">
                    <NavLink
                      className={({ isActive }) => (isActive ? "active !px-0" : "!px-0")}
                      to={item.to}
                    >
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
