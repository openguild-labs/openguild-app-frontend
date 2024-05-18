import MissionCard from "@/components/MissionCard";
import SearchInput from "@/components/SearchInput";
import DropDown from "@/pages/Missions/components/DropDown";
import { useState } from "react";

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
    <div>
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
              <MissionCard />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Missions;
