"use client";

import ActivityList from "./components/ActivityList";
import Banner from "./components/Banner";
import CardContainer from "./components/CardContainer";
import Filter from "./components/Filter";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import { Tab, Tabs } from "@mui/material";

const categories: TOption[] = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "NFT",
    value: "NFT",
  },
  {
    label: "EVM NFT",
    value: "EVM NFT",
  },
  {
    label: "SOL NFT",
    value: "SOL NFT",
  },
  {
    label: "Gift Card",
    value: "Gift Card",
  },
  {
    label: "Lucky Ticket",
    value: "Lucky Ticket",
  },
];

function Rewards() {
  const [value, setValue] = useState<string>(categories[0].value);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="h-auto mt-3 mb-8">
      <Banner />
      <div className="mt-3 text-[40px] font-semibold text-primary-color">Reward Center</div>
      <div className="border-b border-neutral-300">
        <Tabs value={value} onChange={handleChange}>
          {categories.map((category, index) => {
            return <Tab key={index} label={<span className="capitalize text-base">{category.label}</span>} value={category.value} />;
          })}
        </Tabs>
      </div>
      <div className="block md:flex gap-2 items-center mt-3 gap-x-10">
        <SearchInput placeholder="Search by reward, community, badge ..." />
        <div className="mt-4 md:mt-0 text-end max-[767px]:[&_>_button]:w-full">
          <Filter />
        </div>
      </div>
      <div className="flex mt-4 items-start gap-4">
        <CardContainer />
        <ActivityList />
      </div>
      <Pagination />
    </div>
  );
}

export default Rewards;
