import { Button } from "@headlessui/react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { HEADER_HEIGHT } from "../../constants/dimensions";
import "./Layout.css";
import { HOME_PATH, MISSIONS_PATH, REWARDS_PATH } from "../../constants/links";

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
  const location = useLocation();
  const isHomePath = location.pathname === HOME_PATH;

  return (
    <main className="bg-black min-h-screen pb-12">
      <header
        className="flex items-center px-9 fixed top-0 right-0 left-0 bg-neutral-950 shadow-xs shadow-neutral-100 z-10"
        style={{
          height: HEADER_HEIGHT,
          justifyContent: isHomePath ? "center" : "space-between",
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

            <Button as="button" className="bg-[#0fdbd1] text-black text-sm font-bold rounded-lg px-4 py-2">
              Login
            </Button>
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
