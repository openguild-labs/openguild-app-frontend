"use server";
import { ENDING_STATUS, MISSION_STATUS__TYPE } from "@/constants/mission";
import { getStatusMission, getStatusTypeMission } from "@/supabase/api/mission/utils";
import CommonInfo from "./components/CommonInfo";
import Tasks from "./components/Tasks";
import HeaderDetails from "@/components/HeaderDetails";
import DescriptionDetails from "@/components/DescriptionDetails";
import { getMission } from "@/supabase/api/mission/callers";

interface IMissionDetailsProps {
  params: {
    id: string;
  };
}

async function MissionDetails({ params: { id } }: IMissionDetailsProps) {
  const data = await getMission(id);

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
        <div className="lg:hidden block">
          <HeaderDetails title={data.title} />
        </div>
        <div className="w-full md:w-[40%] shrink-0">
          <CommonInfo imgSrc={data.bannerURL} category={data.category} participants={data.participants} totalXP={totalXP} />
        </div>
        <div className="flex flex-col gap-y-8 flex-1">
          <div className="lg:block hidden">
            <HeaderDetails title={data.title} />
          </div>
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
