import { MISSIONS_PATH } from "@/constants/links";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Tooltip } from "@mui/material";
import Link from "next/link";

interface TCommonInfoProps {
  reward: TRewardDetailsResponse;
}

function CommonInfo({ reward }: TCommonInfoProps) {
  const canClaim = reward.requirements.every((item) => item.isCompleted);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <div>
      <div className="flex items-center">
        <div className="text-black text-md font-bold w-[150px]">Quantity:</div>
        <h2 className="text-xl text-primary-color">{reward.quantity}</h2>
      </div>
      <div className="flex items-center mt-4">
        <div className="text-black text-md font-bold w-[150px]">Requirements:</div>
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
        <Button disabled={!canClaim} variant="contained" className="w-full h-[44px]">
          <span className="capitalize text-sm">Claim</span>
        </Button>
      </div>
    </div>
  );
}

export default CommonInfo;
