import Disclosure from "@/components/Disclosure";
import { INTENT_BASE_URL, socialMedia, WORKSHOP_TYPE } from "@/constants/mission";
import { missionKey, useCompleteTask, useCreateProofsOfWork, useGetCompletedTasks } from "@/supabase/api/mission/services";
import { Button } from "@headlessui/react";
import { CircularProgress, Modal, Button as ButtonMUI } from "@mui/material";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import "../style.css";
import { useGetUser } from "@/supabase/api/user/services";
import { toast } from "react-toastify";
import { useAccount } from "@particle-network/connect-react-ui";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TipTap from "@/components/TipTap";
import { TIPTAP_EMPTY_STRING, TTipTap } from "@/components/TipTap/TipTap";
interface ITasksProps {
  tasks: TTaskModel[];
  isEnded: boolean;
  isNotStart: boolean;
}

const isCompletedTask = (taskID: number, completedTasks: TCompletedTaskModel[]) => {
  return completedTasks.some((completedTask) => completedTask.task_id === taskID);
};

const getActionLabel = (type: string) => {
  switch (type) {
    case socialMedia.twitter:
      return "Connect X";
    case socialMedia.discord:
      return "Join";
    default:
      return "Submit";
  }
};

function Tasks({ tasks, isEnded, isNotStart }: ITasksProps) {
  const account = useAccount();
  const { data: userInfo } = useGetUser(account || "");

  const [verifiedTasks, setVerifiedTasks] = useState<number[]>([]);
  const taskIDs = tasks.map((task) => task.id);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const [isVerifyingTaskID, setIsVerifyingTaskID] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [proof, setProof] = useState<string>("");
  const tiptapRef = useRef<TTipTap>(null);

  const { data, refetch } = useGetCompletedTasks(userInfo?.id || 0, taskIDs);
  const { mutate } = useCompleteTask(userInfo?.id || 0);
  const [isAllTasksCompleted, setIsAllTasksCompleted] = useState(false);

  const { mutate: proofMutate, isPending } = useCreateProofsOfWork();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isVerifyingTaskID === 0) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      mutate(isVerifyingTaskID, {
        onSuccess: (isCompleted) => {
          if (isCompleted) {
            refetch();
            queryClient.invalidateQueries({
              queryKey: [missionKey.mission, id],
              exact: true,
            });
            toast.success("Task is verified!");
          }
        },
      });
      setIsVerifyingTaskID(0);
    }, 1000);
  }, [isVerifyingTaskID, mutate, refetch, id, queryClient]);

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

      if (data.length === tasks.length) {
        setIsAllTasksCompleted(true);
      }
    }
  }, [data, tasks.length]);

  const onCloseModal = () => {
    setOpenModal(false);
    setProof("");
    setCompletedTasks((prev) => {
      if (prev.length === 0) return prev;
      return prev.slice(0, prev.length - 1);
    });
    tiptapRef.current?.cancel("");
  };

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
                  <h3 className="text-ellipsis line-clamp-1 text-start font-bold">{task.name}</h3>
                  {!isEnded && !isNotStart && userInfo !== undefined && (
                    <div className="flex items-center gap-x-2 shrink-0 ml-2">
                      {/* completion button */}
                      <div
                        className={clsx(
                          "transition-effect text-sm py-1 px-4 border border-primary-color rounded-md completion-btn",
                          "flex items-center gap-x-2",
                          { verified: isVerified }
                        )}
                        onClick={(event) => {
                          event.stopPropagation();

                          if (isVerified) return;

                          if (task.type === WORKSHOP_TYPE) {
                            setOpenModal(true);
                            setCompletedTasks([...completedTasks, task.id]);
                            return;
                          }

                          if (task.action.includes(INTENT_BASE_URL)) {
                            window.open(task.action, task.action, "width=540,height=600");
                          } else {
                            window.open(task.action);
                          }
                          setCompletedTasks([...completedTasks, task.id]);
                        }}
                      >
                        {!isVerified && (task.button_placeholder ? task.button_placeholder : getActionLabel(task.type))}
                        {isVerified && (
                          <>
                            <IoCheckmark />
                            Completed
                          </>
                        )}
                      </div>
                      {/* verification button */}
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

      <Modal open={openModal} onClose={onCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <div className="sm:w-[480px] w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-3">
          <h2 className="text-lg font-bold text-primary-color mb-2">Proof of Work</h2>
          <div className="w-full aspect-video">
            <TipTap ref={tiptapRef} placeholder="Write something to prove your work" content={proof} setContent={setProof} />
          </div>

          <div className="mt-4 flex items-center justify-end gap-x-2">
            <ButtonMUI variant="outlined" color="primary" onClick={onCloseModal}>
              <span className="capitalize">Cancel</span>
            </ButtonMUI>
            <ButtonMUI variant="contained" color="primary">
              <span
                className="capitalize flex items-center gap-x-2"
                onClick={() => {
                  if (proof === "" || proof === TIPTAP_EMPTY_STRING) {
                    onCloseModal();
                    return;
                  }
                  const taskID = completedTasks[completedTasks.length - 1];
                  proofMutate(
                    {
                      user_id: userInfo?.id || 0,
                      task_id: taskID,
                      proof,
                    },
                    {
                      onSuccess: () => {
                        setIsVerifyingTaskID(taskID);
                        setVerifiedTasks([...verifiedTasks, taskID]);
                        setProof("");
                        setOpenModal(false);
                        tiptapRef.current?.cancel("");
                      },
                    }
                  );
                }}
              >
                {isPending && <CircularProgress color="inherit" size={14} />}
                Submit
              </span>
            </ButtonMUI>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Tasks;
