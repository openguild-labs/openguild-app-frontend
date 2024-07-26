import { useSendClaimRewardRequest } from "@/app/api/services";
import { REWARD_TYPE } from "@/constants/claimRequestType";
import { MISSIONS_PATH } from "@/constants/links";
import { useCheckClaimRequest, useCreateClaimRequest } from "@/supabase/api/claimRequest/services";
import { useMediaQuery } from "@mantine/hooks";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import Link from "next/link";
import { toast } from "react-toastify";

interface TCommonInfoProps {
  reward: TRewardDetailsResponse;
  userID: number;
  username: string;
  rewardID: number;
  rewardName: string;
}

function CommonInfo({ reward, username, rewardName, userID, rewardID }: TCommonInfoProps) {
  const canClaim = reward.requirements.every((item) => item.isCompleted);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { mutate: sendClaimRequest, isPending: isPendingClaim } = useSendClaimRewardRequest();

  const { data: isSent, refetch } = useCheckClaimRequest({ user_id: userID, object_id: rewardID, type: REWARD_TYPE });
  const { mutate: storeClaimRequest, isPending: isPendingStore } = useCreateClaimRequest();
  const handleClaim = () => {
    if (!canClaim) return;
    sendClaimRequest(
      { username, rewardName },
      {
        onSuccess: () => {
          storeClaimRequest(
            { user_id: userID, object_id: rewardID, type: REWARD_TYPE },
            {
              onSuccess: (resp) => {
                if (resp) {
                  refetch();
                  toast.success("Claim request is sent to Admin!");
                }
              },
            }
          );
        },
      }
    );
  };

  return (
    <div>
      <div className="flex items-center">
        <div className="text-black text-md font-bold w-[150px] shrink-0">Quantity:</div>
        <h2 className="text-xl text-primary-color">{reward.quantity}</h2>
      </div>
      <div className="flex items-center mt-4">
        <div className="text-black text-md font-bold w-[150px] shrink-0">Requirements:</div>
        <div
          className="flex items-center gap-x-2 w-full overflow-x-scroll pb-3"
          style={{
            maxWidth: isDesktop ? "350px" : "810px",
          }}
        >
          {reward.requirements.map((item) => {
            return (
              <Link
                href={`${MISSIONS_PATH}/${item.id}`}
                target="_blank"
                key={item.id}
                className="w-[80px] h-[80px] p-1 border-[2px] rounded shrink-0"
                style={{
                  borderColor: item.isCompleted ? "#70e000" : "#db4646",
                }}
              >
                <Tooltip
                  title={item.isCompleted ? "" : <span className="text-sm">You are missing this mission</span>}
                  placement="top"
                  arrow
                >
                  <img src={item.bannerURL} alt="image" className="w-full h-full rounded-sm object-cover" />
                </Tooltip>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button
          disabled={!canClaim || isSent}
          variant="contained"
          className="w-full h-[44px] flex items-center gap-x-2"
          onClick={handleClaim}
        >
          {(isPendingClaim || isPendingStore) && <CircularProgress color="inherit" size={14} />}
          <span className="normal-case text-sm">{isSent ? "Request is sent" : "Claim"}</span>
        </Button>
      </div>
    </div>
  );
}

export default CommonInfo;
