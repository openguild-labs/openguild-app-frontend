import { ENDING_STATUS, MISSION_STATUS__TYPE } from "@/constants/mission";
import { useGetMission } from "@/supabase/api/mission/services";
import { getStatusMission, getStatusTypeMission } from "@/supabase/api/mission/utils";
import { useMediaQuery } from "@mantine/hooks";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import CommonInfo from "./components/CommonInfo";
import Description from "./components/Description";
import Header from "./components/Header";
import MissionDetailsSkeleton from "./components/MissionDetailsSkeleton";
import Tasks from "./components/Tasks";
import { Helmet } from "react-helmet-async";

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
  const statusTypeMission = getStatusTypeMission(data.start_date, data.end_date);

  const totalXP = data.tasks.reduce((total, task) => total + task.xp, 0);

  return (
    <div className="mt-[30px] pb-10">
      <Helmet>
        <title>{data.title}</title>
        <meta property="og:title" content={data.title} />
        <meta property="og:site_name" content={data.title} />
        <meta property="og:image" content={data.bannerURL} />
        <meta property="og:image:width" content="372" />
        <meta property="og:image:height" content="372" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="flex gap-8 flex-col lg:flex-row">
        {!isDesktop && <Header title={data.title} />}
        <div className="w-full md:w-[40%] shrink-0">
          <CommonInfo imgSrc={data.bannerURL} status={statusTypeMission} participants={data.participants} totalXP={totalXP} />
        </div>
        <div className="flex flex-col gap-y-8 flex-1">
          {isDesktop && <Header title={data.title} />}
          <Tasks
            tasks={data.tasks || []}
            isEnded={statusMission === ENDING_STATUS}
            isNotStart={statusTypeMission === MISSION_STATUS__TYPE.NOT_START}
          />
          <Description description={data.description} />
        </div>
      </div>
    </div>
  );
}

export default MissionDetails;
