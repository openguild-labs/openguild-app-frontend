import HeaderDetailsSkeleton from "@/components/HeaderDetailsSkeleton";
import CommonInfoSkeleton from "./CommonInfoSkeleton";
import TasksSkeleton from "./TasksSkeleton";

function MissionDetailsSkeleton() {
  return (
    <div className="mt-[30px] pb-10">
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="lg:hidden block">
          <HeaderDetailsSkeleton />
        </div>

        <div className="w-full md:w-[40%] shrink-0">
          <CommonInfoSkeleton />
        </div>
        <div className="flex flex-col gap-y-8 flex-1">
          <div className="lg:block hidden">
            <HeaderDetailsSkeleton />
          </div>

          <TasksSkeleton />
        </div>
      </div>
    </div>
  );
}

export default MissionDetailsSkeleton;
