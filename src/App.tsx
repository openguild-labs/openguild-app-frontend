import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import Missions from "./app/missions/page";
import NotFound from "./abc/NotFound";
import Rewards from "./abc/Rewards";
import Home from "./abc/Home";
import MissionDetails from "./app/mission-detail/MissionDetails";
import RewardDetail from "./abc/RewardDetail/RewardDetail";
import Profile from "./app/profile/Profile";
import "./tiptap.css";
import ProfileUser from "./app/profile/ProfileUser";

function App() {
  // const routes: RouteObject[] = [
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     children: [
  //       { path: "/", element: <Home /> },
  //       { path: "/missions", element: <Missions /> },
  //       { path: "/missions/:id", element: <MissionDetails /> },
  //       { path: "/rewards", element: <Rewards /> },
  //       { path: "/rewards/:id", element: <RewardDetail /> },
  //       { path: "/profile", element: <Profile /> },
  //       { path: "/user", element: <ProfileUser /> },

  //       { path: "*", element: <NotFound /> },
  //     ],
  //   },
  // ];
  // return useRoutes(routes);
  return null;
}

export default App;
