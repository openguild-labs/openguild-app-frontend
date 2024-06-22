import DropDown from "./components/DropDown";
import { useState } from "react";
import CustomTab from "@/components/CustomTab";
import SearchInput from "@/components/SearchInput";
import Banner from "./components/Banner";
import MissionCard from "@/components/MissionCard";
import { useCountTotalMission, useListMission } from "@/supabase/api/mission/services";
import { useSearchParams } from "react-router-dom";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/pagination";
import { Pagination } from "@mui/material";
import MissionCardSkeleton from "@/components/MissionCardSkeleton";

const missionCategories: TOption[] = [
  {
    name: "All",
  },
  {
    name: "In Progress",
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

const renderListMission = (data: TMissionResponse[], isLoading: boolean) => {
  if (isLoading) {
    return [1, 2, 3, 4].map((index) => {
      return <MissionCardSkeleton key={index} />;
    });
  }

  return data.map((mission) => {
    return <MissionCard key={mission.id} mission={mission} />;
  });
};

function Missions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pParam = searchParams.get("p");
  const p = pParam === null ? PAGE_DEFAULT + 1 : parseInt(pParam as string);

  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [page, setPage] = useState(p);
  const { data, isLoading } = useListMission(page - 1);
  const { data: missionTotal } = useCountTotalMission();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
    setSearchParams({ p: newPage.toString() });
  };

  return (
    <div className="mt-3">
      <Banner />
      <h1 className="text-[40px] text-primary-color font-bold mt-6">Missions</h1>
      <CustomTab options={missionCategories} />
      <div className="block md:flex justify-center items-center mt-3 gap-x-8">
        <SearchInput placeholder="Search by community, tag, badge, name, ..." />
        <div className="mt-4 md:mt-0 text-end max-[767px]:[&_>_button]:w-full">
          <DropDown
            value={selectedOption}
            onChange={(value) => {
              setSelectedOption(value);
            }}
            options={options}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-4 mt-3">
        {renderListMission(data || [], isLoading)}
      </div>
      <div className="flex justify-center mt-3">
        <Pagination count={Math.ceil((missionTotal || 0) / LIMIT_DEFAULT)} color="primary" page={page} onChange={handleChangePage} />
      </div>
    </div>
  );
}

export default Missions;
