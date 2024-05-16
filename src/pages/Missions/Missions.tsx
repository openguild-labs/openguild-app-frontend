import DropDown from "./components/DropDown";
import { useState } from "react";
import CustomTab from "@/components/CustomTab";
import SearchInput from "@/components/SearchInput";
import Banner from "./components/Banner";
import Mission from "../../components/Mission";
import Pagination from "@/components/Pagination";

const missionCategories: TCategory[] = [
  {
    name: "All",
  },
  {
    name: "Social Media",
  },
  {
    name: "In-game",
  },
  {
    name: "Ended",
  },
];

const options: TOptions[] = [
  {
    value: "Newest",
    label: "Newest",
  },
  {
    value: "Top/Trending",
    label: "Top/Trending",
  },
];

function Missions() {
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  return (
    <div className="mt-3">
      <Banner />
      <h1 className="text-[40px] text-primary-color font-bold mt-6">Missions</h1>
      <CustomTab categories={missionCategories} />
      <div className="flex justify-center items-center mt-3 gap-x-10">
        <SearchInput placeholder="Search by community, tag, badge, name, ..." />
        <DropDown
          value={selectedOption}
          onChange={(value) => {
            setSelectedOption(value);
          }}
          options={options}
        />
      </div>
      <div className="flex flex-wrap -mx-2 gap-y-4 mt-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
          return <Mission />;
        })}
      </div>
      <Pagination />
    </div>
  );
}

export default Missions;
