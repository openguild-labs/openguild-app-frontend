"use client";
import CommonInfo from "./components/CommonInfo";
import { useMediaQuery } from "@mantine/hooks";
import HeaderDetails from "@/components/HeaderDetails";
import { useGetReward } from "@/supabase/api/reward/services";
import DescriptionDetails from "@/components/DescriptionDetails";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { useContext } from "react";
import MyContext, { MyContextType } from "@/context/MyContext";
import RewardDetailsSkeleton from "./components/RewardDetailsSkeleton";

interface IRewardDetailsProps {
  params: {
    id: string;
  };
}

function RewardDetail({ params: { id } }: IRewardDetailsProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  console.log(isDesktop);
  const { value } = useContext(MyContext) as MyContextType;
  const { data, isLoading } = useGetReward(id, value?.id || 0);

  if (isLoading) {
    return <RewardDetailsSkeleton />;
  }

  if (data === undefined || data === null) {
    return (
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center mt-10">
          <HiOutlineInboxStack size={40} />
          <span className="text-lg">Reward not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[30px] pb-10">
      <div className="flex gap-8 flex-col lg:flex-row">
        {!isDesktop && <HeaderDetails title={data.name} />}
        <div className="w-full md:w-1/2 shrink-0">
          <div className="rounded-xl shadow-lg bg-white p-3 w-full flex flex-col gap-y-3 relative">
            <img loading="lazy" src={data.imageURL} alt="image" className="object-cover aspect-square rounded-lg" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-8 order-1">
          {isDesktop && <HeaderDetails title={data.name} />}
          <CommonInfo reward={data} username={value?.email || ""} userID={value?.id || 0} rewardID={data.id} rewardName={data.name} />
          <DescriptionDetails description={data.description} />
        </div>
      </div>
    </div>
  );
}

export default RewardDetail;
