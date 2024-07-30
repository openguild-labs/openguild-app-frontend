import { REWARDS_PATH } from "@/constants/links";
import Link from "next/link";

interface IRewardCardProps {
  reward: TRewardResponse;
}

function RewardCard({ reward }: IRewardCardProps) {
  return (
    <Link href={`${REWARDS_PATH}/${reward.id}`}>
      <div className="w-full bg-white text-black rounded-lg relative cursor-pointer hover:scale-[102%] duration-200 transition">
        <div className="w-full aspect-square">
          <img className="rounded-lg w-full h-full object-cover" src={reward.imageURL} alt="CardImg" />
        </div>
        <div className="mt-1">
          <h3 className="line-clamp-1 text-base font-bold">{reward.name}</h3>
          <span className="text-sm">Quantity: {reward.quantity}</span>
        </div>
      </div>
    </Link>
  );
}

export default RewardCard;
