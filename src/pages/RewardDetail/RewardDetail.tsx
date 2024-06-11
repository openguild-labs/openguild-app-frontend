import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Description from "./components/Description";
import CommonInfo from "../Rewards/components/CommonInfo";
import MissionCard from "@/components/MissionCard";
import ViewMoreButton from "@/components/ViewMoreButton";
import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";

function RewardDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isDesktop = useMediaQuery('(min-width: 1024px)');






  return (
    <div className="mt-[30px] pb-10">
      <div className="flex gap-8 flex-col lg:flex-row">
        {!isDesktop && <Header />}
        <div className="w-full md:w-[40%] shrink-0">
          <CommonInfo />
        </div>
        <div className="flex flex-col gap-y-8 order-1">
          {isDesktop && <Header />}
          <Tasks />
          <Description />
        </div>
      </div>
      <div className="mt-8">
        <span className="text-xl text-primary-color">Popular item</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -mx-2 gap-y-4 mt-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
            return (
              <div key={item}>
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
