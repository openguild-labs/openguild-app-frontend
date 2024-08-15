import { useSendClaimRewardRequest } from "@/app/api/services";
import { REWARD_TYPE } from "@/constants/claimRequestType";
import { MISSIONS_PATH, PROFILE_PATH } from "@/constants/links";
import { useCheckClaimRequest, useCreateClaimRequest } from "@/supabase/api/claimRequest/services";
import { useMediaQuery } from "@mantine/hooks";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface TCommonInfoProps {
  reward: TRewardDetailsResponse;
  user: TUserModel | undefined;
  rewardID: number;
  rewardName: string;
}

function CommonInfo({ reward, user, rewardName, rewardID }: TCommonInfoProps) {
  const canClaim = reward.is_shared
    ? reward.requirements.some((item) => item.isCompleted)
    : reward.requirements.every((item) => item.isCompleted);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const router = useRouter();
  const { mutate: sendClaimRequest, isPending: isPendingClaim } = useSendClaimRewardRequest();

  const { data: isSent, refetch } = useCheckClaimRequest({ user_id: user?.id || 0, object_id: rewardID, type: REWARD_TYPE });
  const { mutate: storeClaimRequest, isPending: isPendingStore } = useCreateClaimRequest();
  const handleClaim = () => {
    if (!canClaim) return;

    if (user?.discord === undefined || user?.discord === "") {
      toast.warn("Please authenticate Discord to claim Reward!");
      router.push(PROFILE_PATH);
      return;
    }

    sendClaimRequest(
      { userID: user?.discord_id || "", rewardName },
      {
        onSuccess: () => {
          storeClaimRequest(
            { user_id: user?.id || 0, object_id: rewardID, type: REWARD_TYPE },
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
        <h2 className="text-xl text-primary-color">{reward.quantity === 0 ? <span className="text-3xl">∞</span> : reward.quantity}</h2>
      </div>
      <div className="flex items-center mt-4">
        <div className="text-black text-md font-bold w-[150px] shrink-0">{reward.is_shared ? "Related Missions" : "Requirements"}:</div>
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
          <span className="normal-case text-sm">{isSent ? "Request is sent" : "Request Reward via Discord"}</span>
        </Button>
      </div>
    </div>
  );
}

export default CommonInfo;
