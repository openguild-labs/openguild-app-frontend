import Disclosure from "@/components/Disclosure";
import { INTENT_BASE_URL, socialMedia } from "@/constants/mission";
import { useCompleteTask, useGetCompletedTasks } from "@/supabase/api/mission/services";
import { useGetUser } from "@/supabase/api/user/services";
import { Button } from "@headlessui/react";
import { CircularProgress } from "@mui/material";
import { useAccount } from "@particle-network/connect-react-ui";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { toast } from "react-toastify";
import "../style.css";
interface ITasksProps {
  tasks: TTaskModel[];
  isEnded: boolean;
  isNotStart: boolean;
}

const isCompletedTask = (taskID: number, completedTasks: TCompletedTaskModel[]) => {
  return completedTasks.some((completedTask) => completedTask.task_id === taskID);
};

function Tasks({ tasks, isEnded, isNotStart }: ITasksProps) {
  const account = useAccount();

  const { data: userInfo } = useGetUser(account || "");
  const taskIDs = tasks.map((task) => task.id);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [verifiedTasks, setVerifiedTasks] = useState<number[]>([]);

  const { data, refetch } = useGetCompletedTasks(userInfo?.id || 0, taskIDs);
  const { mutate } = useCompleteTask(userInfo?.id || 0);
  const [isVerifyingTaskID, setIsVerifyingTaskID] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const isAllTasksCompleted = tasks.length === verifiedTasks.length;
  console.log({ verifiedTasks, tasks, completedTasks });
  useEffect(() => {
    if (isVerifyingTaskID === 0) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      mutate(isVerifyingTaskID, {
        onSuccess: (isCompleted) => {
          if (isCompleted) {
            refetch();
          }
        },
      });
      setIsVerifyingTaskID(0);
    }, 1000);
  }, [isVerifyingTaskID, isVerifying, mutate, refetch]);

  const handleLogin = () => {
    (document.getElementsByClassName("particle-connect-wallet-btn")[0] as HTMLElement).click();
  };

  const handleClaim = () => {
    toast.info("Rewards coming soon!");
  };

  useEffect(() => {
    if (data) {
      setCompletedTasks([...new Set(data?.map((item) => item.task_id))]);
      setVerifiedTasks([...new Set(data?.map((item) => item.task_id))]);
    }
  }, [data]);
  return (
    <div>
      <div className="flex flex-col gap-y-4">
        {tasks.map((task, index) => {
          const isVerified = isCompletedTask(task.id, data || []);
          const isCompleted = completedTasks.includes(task.id);
          return (
            <Disclosure
              key={index}
              title={
                <div className="flex items-center justify-between w-full">
                  <span className="text-ellipsis line-clamp-1 text-start">{task.name}</span>
                  {!isEnded && !isNotStart && userInfo !== undefined && (
                    <div className="flex items-center gap-x-2 shrink-0 ml-2">
                      <div
                        className={clsx(
                          "transition-effect text-sm py-1 px-4 border border-primary-color rounded-md completion-btn",
                          "flex items-center gap-x-2",
                          { verified: isVerified },
                        )}
                        onClick={(event) => {
                          event.stopPropagation();

                          if (isVerified) return;

                          if (task.action.includes(INTENT_BASE_URL)) {
                            window.open(task.action, task.action, "width=540,height=600");
                          } else {
                            window.open(task.action);
                          }
                          setCompletedTasks([...completedTasks, task.id]);
                        }}
                      >
                        {!isVerified && (task.type === socialMedia.twitter ? "Connect X" : "Join")}
                        {isVerified && (
                          <>
                            <IoCheckmark />
                            Completed
                          </>
                        )}
                      </div>
                      <div
                        className={clsx("transition-effect text-sm py-1 px-4 rounded-md", "flex items-center gap-x-2 verification-btn", {
                          verified: isVerified,
                        })}
                        style={{
                          cursor: isCompleted ? "pointer" : "not-allowed",
                          color: isVerified ? "green" : "black",
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                          if (isCompleted && !isVerified) {
                            setIsVerifyingTaskID(task.id);
                            setVerifiedTasks([...verifiedTasks, task.id]);
                          }
                        }}
                      >
                        {isVerifyingTaskID === task.id && isVerifying && <CircularProgress size={14} />}
                        {isVerified && <IoCheckmark />}
                        {isVerified ? "Verified" : "Verify"}
                      </div>
                    </div>
                  )}
                </div>
              }
              description={task.description}
            />
          );
        })}
      </div>
      {!account ? (
        <div className="flex justify-center">
          <Button className="py-1 px-4 h-[44px] w-full rounded-lg bg-primary-color text-white font-bold text-sm mt-6" onClick={handleLogin}>
            Login
          </Button>
        </div>
      ) : isAllTasksCompleted ? (
        <div className=" text-center mt-6">
          <div className="text-[15px] font-medium text-primary-color">Mission completed!</div>
          <Button className="py-1 px-4 h-[44px] w-full rounded-lg bg-primary-color text-white font-bold text-sm mt-2" onClick={handleClaim}>
            Claim
          </Button>
        </div>
      ) : null}
      <div className="w-full h-[1px] bg-gray-300 mt-6" />
    </div>
  );
}

export default Tasks;
