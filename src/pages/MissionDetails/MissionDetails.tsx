import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Description from "./components/Description";
import CommonInfo from "../Rewards/components/CommonInfo";
import Mission from "@/components/Mission";
import { Button } from "@headlessui/react";

function MissionDetails() {
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
        <span className="text-xl text-primary-color">Popular Mission</span>
        <div className="flex flex-wrap -mx-2 gap-y-4 mt-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
            return <Mission />;
          })}
        </div>
        <div className="flex justify-center">
          <Button className="py-1 px-4 w-[160px] h-[44px] rounded-lg bg-black text-primary-color border border-neutral-800 font-bold text-sm mt-6 hover:border-primary-color transition-effect">
            View More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MissionDetails;
