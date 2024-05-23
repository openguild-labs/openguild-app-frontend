import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Description from "./components/Description";
import CommonInfo from "../Rewards/components/CommonInfo";
import MissionCard from "@/components/MissionCard";
import ViewMoreButton from "@/components/ViewMoreButton";
import { useEffect } from "react";

function RewardDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-[30px] pb-10">
      <div className="flex gap-x-8">
        <div className="w-[40%] shrink-0">
          <CommonInfo />
        </div>
        <div className="flex flex-col gap-y-8">
          <Header />
          <Tasks />
          <Description />
        </div>
      </div>
      <div className="mt-8">
        <span className="text-xl text-primary-color">Popular item</span>
        <div className="flex flex-wrap -mx-2 gap-y-4 mt-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
            return (
              <div key={item} className="w-[25%] px-2">
                <MissionCard />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <ViewMoreButton />
        </div>
      </div>
    </div>
  );
}

export default RewardDetail;
