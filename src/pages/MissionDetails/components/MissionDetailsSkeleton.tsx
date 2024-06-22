import { useMediaQuery } from "@mantine/hooks";
import HeaderSkeleton from "./HeaderSkeleton";
import CommonInfoSkeleton from "./CommonInfoSkeleton";
import TasksSkeleton from "./TasksSkeleton";

function MissionDetailsSkeleton() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <div className="mt-[30px] pb-10">
      <div className="flex gap-8 flex-col lg:flex-row">
        {!isDesktop && <HeaderSkeleton />}

        <div className="w-full md:w-[40%] shrink-0">
          <CommonInfoSkeleton />
        </div>
        <div className="flex flex-col gap-y-8 w-full">
          {isDesktop && <HeaderSkeleton />}
          <TasksSkeleton />
        </div>
      </div>
    </div>
  );
}

export default MissionDetailsSkeleton;
