import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import Missions from "./pages/Missions";
import NotFound from "./pages/NotFound";
import Rewards from "./pages/Rewards";
import Home from "./pages/Home";
import MissionDetails from "./pages/MissionDetails";
import RewardDetail from "./pages/RewardDetail/RewardDetail";
import Profile from "./pages/Profile/Profile";
import "./tiptap.css";
import ProfileUser from "./pages/Profile/ProfileUser";

function App() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/missions", element: <Missions /> },
        { path: "/missions/:id", element: <MissionDetails /> },
        { path: "/rewards", element: <Rewards /> },
        { path: "/rewards/:id", element: <RewardDetail /> },
        { path: "/profile", element: <Profile /> },
        { path: "/user", element: <ProfileUser /> },

        { path: "*", element: <NotFound /> },
      ],
    },
  ];
  return useRoutes(routes);
}

export default App;
