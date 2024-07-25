"use client";
import Banner from "./components/Banner";
import SearchInput from "@/components/SearchInput";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Pagination, Tab, Tabs } from "@mui/material";
import { rewardType } from "@/constants/reward";
import { useSearchParams } from "@/utils";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/pagination";
import { useCountTotalReward, useListReward } from "@/supabase/api/reward/services";
import { HiOutlineInbox } from "react-icons/hi2";
import RewardCard from "@/components/RewardCard";
import RewardCardSkeleton from "@/components/RewardCardSkeleton";

const categories: TOption[] = [
  {
    label: rewardType.thirdPartyGifts,
    value: "0",
  },
  {
    label: rewardType.physicalGoods,
    value: "1",
  },
];

const renderRewards = (data: TRewardResponse[], isLoading: boolean) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-4 mt-3">
        {[1, 2, 3, 4].map((index) => {
          return <RewardCardSkeleton key={index} />;
        })}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <HiOutlineInbox size={28} className="mt-8" />
        <span>Have no reward</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-4 mt-3">
      {data.map((reward) => {
        return <RewardCard key={reward.id} reward={reward} />;
      })}
    </div>
  );
};

function Rewards() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pParam = searchParams.get("p");
  const cParam = searchParams.get("c");
  const sParam = searchParams.get("s");
  const p = pParam === null ? PAGE_DEFAULT + 1 : Number.isNaN(parseInt(pParam)) ? PAGE_DEFAULT + 1 : parseInt(pParam);
  const c = cParam === null ? "0" : Number.isNaN(parseInt(cParam)) ? "0" : cParam;
  const s = sParam === null ? "" : sParam;

  const initQueryValue = useMemo(
    () => ({
      categoryID: c,
      page: p,
      searchValue: s,
    }),
    [c, p, s]
  );
  const [rewardQuery, setRewardQuery] = useState(initQueryValue);
  const { data, isLoading } = useListReward(rewardQuery.page - 1, rewardQuery.searchValue, rewardQuery.categoryID);
  const { data: total } = useCountTotalReward(rewardQuery.searchValue, rewardQuery.categoryID);

  console.log(data);
  const handleChangeCategory = (_: React.SyntheticEvent, newValue: string) => {
    setRewardQuery({ categoryID: newValue, searchValue: "", page: PAGE_DEFAULT + 1 });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setRewardQuery({ ...rewardQuery, searchValue: event.target.value, page: PAGE_DEFAULT + 1 });
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setRewardQuery({ ...rewardQuery, page: newPage });
  };

  const rewardQueryStr = JSON.stringify(rewardQuery);
  useEffect(() => {
    const newParams: { [key: string]: string } = { c: rewardQuery.categoryID, p: rewardQuery.page.toString() };

    if (rewardQuery.searchValue !== "") {
      newParams["s"] = rewardQuery.searchValue;
    }

    setSearchParams(newParams);
  }, [rewardQueryStr, rewardQuery, setSearchParams]);

  return (
    <div className="h-auto mt-3 mb-8">
      <Banner />
      <div className="mt-3 text-[40px] font-semibold text-primary-color">Reward Center</div>
      <div className="border-b border-neutral-300">
        <Tabs value={rewardQuery.categoryID} onChange={handleChangeCategory}>
          {categories.map((category, index) => {
            return <Tab key={index} label={<span className="capitalize text-base">{category.label}</span>} value={category.value} />;
          })}
        </Tabs>
      </div>
      <div className="mt-3">
        <SearchInput placeholder="Search by reward name" value={rewardQuery.searchValue} onChange={handleSearch} />
      </div>
      {renderRewards(data || [], isLoading)}
      {!isLoading && data && data?.length > 0 && (
        <div className="flex justify-center mt-3">
          <Pagination count={Math.ceil((total || 0) / LIMIT_DEFAULT)} color="primary" page={rewardQuery.page} onChange={handleChangePage} />
        </div>
      )}
    </div>
  );
}

export default Rewards;
