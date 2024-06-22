import CommonInfo from "./components/CommonInfo";
import Description from "./components/Description";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useMediaQuery } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { useGetMission } from "@/supabase/api/mission/services";
import { getStatusMission } from "@/supabase/api/mission/utils";
import MissionDetailsSkeleton from "./components/MissionDetailsSkeleton";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { ENDING_STATUS } from "@/constants/mission";

function MissionDetails() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetMission(id as string);

  if (isLoading) {
    return <MissionDetailsSkeleton />;
  }

  if (data === undefined || data === null) {
    return (
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center mt-10">
          <HiOutlineInboxStack size={40} />
          <span className="text-lg">Mission not found</span>
        </div>
      </div>
    );
  }

  const statusMission = getStatusMission(data.start_date, data.end_date);

  return (
    <div className="mt-[30px] pb-10">
      <div className="flex gap-8 flex-col lg:flex-row">
        {!isDesktop && <Header title={data.title} />}

        <div className="w-full md:w-[40%] shrink-0">
          <CommonInfo imgSrc={data.bannerURL} status={statusMission} participants={0} />
        </div>
        <div className="flex flex-col gap-y-8">
          {isDesktop && <Header title={data.title} />}
          <Tasks tasks={data.tasks || []} isEnded={statusMission === ENDING_STATUS} />
          <Description description={data.description} />
        </div>
      </div>
    </div>
  );
}

export default MissionDetails;
