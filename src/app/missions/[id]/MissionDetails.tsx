"use client";

import { ENDING_STATUS, MISSION_STATUS__TYPE } from "@/constants/mission";
import { useGetMission } from "@/supabase/api/mission/services";
import { getStatusMission, getStatusTypeMission } from "@/supabase/api/mission/utils";
import { useMediaQuery } from "@mantine/hooks";
import CommonInfo from "./components/CommonInfo";
import MissionDetailsSkeleton from "./components/MissionDetailsSkeleton";
import Tasks from "./components/Tasks";
import HeaderDetails from "@/components/HeaderDetails";
import DescriptionDetails from "@/components/DescriptionDetails";

interface IMissionDetailsProps {
  params: {
    id: string;
  };
}

function MissionDetails({ params: { id } }: IMissionDetailsProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { data, isLoading } = useGetMission(id as string);

  if (isLoading) {
    return <MissionDetailsSkeleton />;
  }

  if (data === undefined || data === null) {
    return (
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center mt-10">
          <img alt="empty image" src="/assets/images/planet.png" className="w-[80px] h-[80px]" />
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
      <div className="flex gap-8 flex-col lg:flex-row">
        {!isDesktop && <HeaderDetails title={data.title} />}
        <div className="w-full md:w-[40%] shrink-0">
          <CommonInfo imgSrc={data.bannerURL} status={statusTypeMission} participants={data.participants} totalXP={totalXP} />
        </div>
        <div className="flex flex-col gap-y-8 flex-1">
          {isDesktop && <HeaderDetails title={data.title} />}
          <Tasks
            tasks={data.tasks || []}
            isEnded={statusMission === ENDING_STATUS}
            isNotStart={statusTypeMission === MISSION_STATUS__TYPE.NOT_START}
            missionName={data.title}
            missionID={id}
            totalXP={totalXP}
          />
          <DescriptionDetails description={data.description} />
        </div>
      </div>
    </div>
  );
}

export default MissionDetails;
