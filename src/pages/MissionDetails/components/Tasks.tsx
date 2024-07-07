import Disclosure from "@/components/Disclosure";
import { INTENT_BASE_URL, socialMedia, WORKSHOP_TYPE } from "@/constants/mission";
import { missionKey, useCompleteTask, useCreateProofsOfWork, useGetCompletedTasks } from "@/supabase/api/mission/services";
import { Button, Input } from "@headlessui/react";
import { CircularProgress, Modal, Button as ButtonMUI, Divider } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoCheckmark, IoTrashOutline } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import "../style.css";
import { useGetUser } from "@/supabase/api/user/services";
import { toast } from "react-toastify";
import { useAccount } from "@particle-network/connect-react-ui";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
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

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function Tasks({ tasks, isEnded, isNotStart }: ITasksProps) {
  const account = useAccount();
  const { data: userInfo } = useGetUser(account || "");

  const [verifiedTasks, setVerifiedTasks] = useState<number[]>([]);
  const taskIDs = tasks.map((task) => task.id);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const [isVerifyingTaskID, setIsVerifyingTaskID] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [proofs, setProofs] = useState<{ link: string; image: string }>({
    link: "",
    image: "",
  });

  const { data, refetch } = useGetCompletedTasks(userInfo?.id || 0, taskIDs);
  const { mutate } = useCompleteTask(userInfo?.id || 0);
  const isAllTasksCompleted = tasks.length === verifiedTasks.length;

  const { mutate: proofsMutate, isPending } = useCreateProofsOfWork();
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
    }
  }, [data]);

  const onCloseModal = () => {
    setOpenModal(false);
    setProofs({ link: "", image: "" });
    setCompletedTasks((prev) => {
      if (prev.length === 0) return prev;

      return prev.slice(0, prev.length - 1);
    });
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
                          { verified: isVerified },
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
                        {!isVerified && getActionLabel(task.type)}
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
          <Input
            placeholder="Submit a link to branding/reflecting post"
            className="w-full px-2 py-1 border-2 border-neutral-300 rounded-md text-sm"
            value={proofs.link}
            onChange={(e) => {
              setProofs((prev) => ({ link: e.target.value, image: prev.image }));
            }}
          />
          <Divider
            sx={{
              marginBlock: "0.5rem",
            }}
          >
            or
          </Divider>
          <div className="w-full h-[200px] border-2 border-neutral-300 border-dashed rounded-md flex flex-col items-center justify-center gap-y-2 p-3">
            {proofs.image !== "" ? (
              <div className="group w-full h-full relative">
                <img src={proofs.image} alt="proof" className="w-full h-full object-contain" />
                <div className="transition-effect absolute inset-0 group-hover:bg-neutral-800/40 rounded flex items-center justify-center">
                  <div
                    className="transition-effect hidden group-hover:flex text-white items-center justify-center px-3 py-1 rounded-full gap-x-1 border border-white bg-neutral-800/50 hover:cursor-pointer hover:bg-neutral-800"
                    onClick={() => setProofs((prev) => ({ link: prev.link, image: "" }))}
                  >
                    <IoTrashOutline size={16} />
                    <span className="text-sm">delete</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <IoCloudUploadOutline size={24} />
                <span className="text-sm">Upload a photo to prove your work</span>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      getBase64(files[0]).then((base64) => {
                        setProofs((prev) => ({ link: prev.link, image: base64 }));
                      });
                    }
                  }}
                />
                <label htmlFor="contained-button-file">
                  <ButtonMUI variant="contained" color="primary" component="span">
                    <span className="capitalize">Choose file</span>
                  </ButtonMUI>
                </label>
              </>
            )}
          </div>
          <div className="mt-4 flex items-center justify-end gap-x-2">
            <ButtonMUI variant="outlined" color="primary" onClick={onCloseModal}>
              <span className="capitalize">Cancel</span>
            </ButtonMUI>
            <ButtonMUI variant="contained" color="primary">
              <span
                className="capitalize flex items-center gap-x-2"
                onClick={() => {
                  if (proofs.link === "" && proofs.image === "") {
                    onCloseModal();
                    return;
                  }
                  const taskID = completedTasks[completedTasks.length - 1];
                  proofsMutate(
                    {
                      user_id: userInfo?.id || 0,
                      task_id: taskID,
                      link: proofs.link,
                      image: proofs.image,
                    },
                    {
                      onSuccess: () => {
                        setIsVerifyingTaskID(taskID);
                        setVerifiedTasks([...verifiedTasks, taskID]);
                        setProofs({ link: "", image: "" });
                        setOpenModal(false);
                      },
                    },
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
