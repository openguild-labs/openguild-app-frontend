import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import Missions from "./pages/Missions";
import NotFound from "./pages/NotFound";
import Rewards from "./pages/Rewards";
import Home from "./pages/Home";
import MissionDetails from "./pages/MissionDetails";

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
        { path: "*", element: <NotFound /> },
      ],
    },
  ];
  return useRoutes(routes);
}

export default App;
