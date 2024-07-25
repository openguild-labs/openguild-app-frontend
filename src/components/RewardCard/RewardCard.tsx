import { REWARDS_PATH } from "@/constants/links";
import Link from "next/link";

interface IRewardCardProps {
  reward: TRewardResponse;
}

function RewardCard({ reward }: IRewardCardProps) {
  return (
    <Link href={`${REWARDS_PATH}/${reward.id}`}>
      <div className="w-full bg-white text-black rounded-lg shadow-lg pb-[3px] relative cursor-pointer hover:scale-[102%] duration-200 transition">
        <div className="h-[240px] md:h-[200px] p-2">
          <img className="rounded-md w-full h-full object-cover" src={reward.imageURL} alt="CardImg" />
        </div>
        <h3 className="py-2 px-4 line-clamp-2 h-12">{reward.name}</h3>
      </div>
    </Link>
  );
}

export default RewardCard;
