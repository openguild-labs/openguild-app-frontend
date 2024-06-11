import collectionBanner from "@assets/images/collection-banner.webp";
import Header from "./components/Header";
import CustomTab from "@/components/CustomTab";
import Overview from "./components/Overview";
import { useState } from "react";
import Missions from "./components/Missions";
import Rewards from "./components/Rewards";

const options: TOption[] = [
  {
    name: "Overview",
    children: <Overview />,
  },
  {
    name: "Missions",
    children: <Missions />,
  },
  {
    name: "Reward Items",
    children: <Rewards />,
  },
];

function CollectionDetails() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  return (
    <div>
      <img className="w-full h-[186px]  lg:h-[356px]" src={collectionBanner} alt="banner" />
      <Header />
      <CustomTab
        options={options}
        onChange={(index) => {
          setCurrentTab(index);
        }}
      />
      {options[currentTab].children}
    </div>
  );
}

export default CollectionDetails;
