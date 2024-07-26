"use client";

import MissionCard from "@/components/MissionCard";
import MissionCardSkeleton from "@/components/MissionCardSkeleton";
import SearchInput from "@/components/SearchInput";
import { MISSION_STATUS__TYPE } from "@/constants/mission";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/pagination";
import { useCountTotalMission, useListMission, useListMissionCategory } from "@/supabase/api/mission/services";
import { useDebouncedValue } from "@mantine/hooks";
import { Pagination, Tab, Tabs } from "@mui/material";
import { useState, useEffect, useMemo, ChangeEvent } from "react";
import Banner from "./components/Banner";
import DropDown from "./components/DropDown";
import { useSearchParams } from "@/utils";

const missionTypes: TOption[] = [
  {
    label: MISSION_STATUS__TYPE.IN_PROGRESS,
    value: MISSION_STATUS__TYPE.IN_PROGRESS,
  },
  {
    label: MISSION_STATUS__TYPE.NOT_START,
    value: MISSION_STATUS__TYPE.NOT_START,
  },
  {
    label: MISSION_STATUS__TYPE.ENDED,
    value: MISSION_STATUS__TYPE.ENDED,
  },
];

const categoryDefault: TOption = {
  label: "All",
  value: "",
};

const renderMissions = (data: TMissionResponse[], isLoading: boolean) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-4 mt-3">
        {[1, 2, 3, 4].map((index) => {
          return <MissionCardSkeleton key={index} />;
        })}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center mt-4">
        <img alt="empty image" src="/assets/images/planet.png" className="w-[80px] h-[80px]" />
        <span>Have no mission</span>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-4 mt-3">
      {data.map((mission) => {
        return <MissionCard key={mission.id} mission={mission} />;
      })}
    </div>
  );
};

const defaultQueryValue = {
  type: 0,
  categoryID: "",
  page: PAGE_DEFAULT + 1,
  searchValue: "",
};

function Missions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pParam = searchParams.get("p");
  const tParam = searchParams.get("t");
  const cParam = searchParams.get("c");
  const sParam = searchParams.get("s");
  const p = pParam === null ? PAGE_DEFAULT + 1 : Number.isNaN(parseInt(pParam)) ? PAGE_DEFAULT + 1 : parseInt(pParam);
  const t = tParam === null ? 0 : Number.isNaN(parseInt(tParam)) ? 0 : parseInt(tParam);
  const c = cParam === null ? "" : Number.isNaN(parseInt(cParam)) ? "" : cParam;
  const s = sParam === null ? "" : sParam;

  const initQueryValue = useMemo(
    () => ({
      type: missionTypes[t].value,
      categoryID: c,
      page: p,
      searchValue: s,
    }),
    [t, c, p, s]
  );
  const [missionQuery, setMissionQuery] = useState(initQueryValue);
  const indexType = missionTypes.findIndex((type) => type.value === missionQuery.type);
  const [searchDebouncedValue] = useDebouncedValue(missionQuery.searchValue, 500);

  const { data, isLoading } = useListMission(missionQuery.page - 1, searchDebouncedValue, missionQuery.type, missionQuery.categoryID);
  const { data: missionTotal } = useCountTotalMission(searchDebouncedValue, missionQuery.type, missionQuery.categoryID);
  const { data: categoryList } = useListMissionCategory();

  const categoryOptions =
    categoryList?.map((category) => {
      return { label: category.name, value: String(category.id) };
    }) || ([] as TOption[]);

  const handleChangeType = (_: React.SyntheticEvent, newValue: string) => {
    setMissionQuery({ ...defaultQueryValue, type: newValue });
  };

  const handleChangeCategory = (value: string) => {
    setMissionQuery({ ...missionQuery, categoryID: value, page: PAGE_DEFAULT + 1 });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setMissionQuery({ ...missionQuery, searchValue: event.target.value, page: PAGE_DEFAULT + 1 });
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setMissionQuery({ ...missionQuery, page: newPage });
  };

  const missionQueryStr = JSON.stringify(missionQuery);
  useEffect(() => {
    const newParams: { [key: string]: string } = { t: indexType.toString(), p: missionQuery.page.toString() };
    if (missionQuery.categoryID !== "") {
      newParams["c"] = missionQuery.categoryID;
    }

    if (missionQuery.searchValue !== "") {
      newParams["s"] = missionQuery.searchValue;
    }

    setSearchParams(newParams);
  }, [missionQueryStr, missionQuery, setSearchParams, indexType]);

  return (
    <div className="mt-3">
      <Banner />
      <h1 className="text-[40px] text-primary-color font-bold mt-6">Missions</h1>
      <div className="border-b border-neutral-300">
        <Tabs value={missionQuery.type} onChange={handleChangeType}>
          {missionTypes.map((category, index) => {
            return <Tab key={index} label={<span className="capitalize text-base">{category.label}</span>} value={category.value} />;
          })}
        </Tabs>
      </div>
      <div className="block md:flex justify-center items-center mt-3 gap-x-8">
        <SearchInput placeholder="Search by community, tag, badge, name, ..." value={missionQuery.searchValue} onChange={handleSearch} />
        <div className="mt-4 md:mt-0 text-end max-[767px]:[&_>_button]:w-full">
          <DropDown value={missionQuery.categoryID} onChange={handleChangeCategory} options={[categoryDefault, ...categoryOptions]} />
        </div>
      </div>
      {renderMissions(data || [], isLoading)}
      {!isLoading && data && data?.length > 0 && (
        <div className="flex justify-center mt-3">
          <Pagination
            count={Math.ceil((missionTotal || 0) / LIMIT_DEFAULT)}
            color="primary"
            page={missionQuery.page}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
}

export default Missions;
