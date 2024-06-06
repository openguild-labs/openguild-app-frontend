import DropDown from "./components/DropDown";
import { useState } from "react";
import CustomTab from "@/components/CustomTab";
import SearchInput from "@/components/SearchInput";
import Banner from "./components/Banner";
import Pagination from "@/components/Pagination";
import MissionCard from "@/components/MissionCard";
import { useContext } from "react";
import MyContext from "@/context/MyContext";
const missionCategories: TOption[] = [
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
  const context = useContext(MyContext as any);

  const { value }: any = context;
  const isStudent = !value?.is_student;
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  return (
    <div className="mt-3">
      <Banner />
      <h1 className="text-[40px] text-primary-color font-bold mt-6">Missions</h1>
      <CustomTab options={missionCategories} />
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
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
          return (
            <div key={item} className="w-[25%] px-2">
              <MissionCard isStudent={isStudent} />
            </div>
          );
        })}
      </div>
      <Pagination />
    </div>
  );
}

export default Missions;
