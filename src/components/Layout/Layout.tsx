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
        className="flex items-center px-9 fixed top-0 right-0 left-0 bg-[#fff] shadow-xs shadow-neutral-100 z-10 text-black"
        style={{
          height: HEADER_HEIGHT,
          justifyContent: isHomePath ? "center" : "space-between",
          marginRight: isDialogOpen ? "14px" : "0",
        }}
      >
        <Link to={MISSIONS_PATH}>
          <h1 className="font-bold text-xl ">ChainCohort</h1>
        </Link>
        {!isHomePath && (
          <>
            <nav id="navbar">
              <ul className="flex space-x-4">
                {linkItems.map((item) => {
                  return (
                    <li key={item.to}>
                      <NavLink
                        style={{
                          height: HEADER_HEIGHT,
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
            <div className="flex gap-4 items-center">
              <ConnectButton />
              {account && <img src={profile} alt="profile" className="w-8 h-8 cursor-pointer" onClick={() => navigate("/profile")} />}
            </div>
          </>
        )}
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
