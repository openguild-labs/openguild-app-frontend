import Tag from "@/components/Tag";
import { REWARDS_PATH } from "@/constants/links";
import CardImg from "@assets/images/card-img.webp";
import { Link } from "react-router-dom";
function RewardCard() {
  return (
    <Link to={`${REWARDS_PATH}/1`}>
      <div className="w-full bg-indigo-600 border border-white/20 rounded-lg shadow relative cursor-pointer hover:border hover:border-[#ff7300]">
        <div className="h-[240px] md:h-[160px]">
          <img className="rounded-t-lg opacity-70 w-full h-full object-fill" src={CardImg} alt="CardImg" />
          <div className="absolute top-3 left-3 bg-[#ff7300] text-sm px-3 py-1 rounded-md text-black">NFT</div>

        </div>
        <div className="my-2 ml-2">Archloot AdventurerPass</div>
        <div className="bg-[#1c2023] mt-3 mb-5 w-full h-[1px]" />
        <div className="flex items-center mb-3 ml-2 gap-1">
          <Tag value="EP 15" />
          <Tag value="Badge Archloot" />
        </div>
      </div>
    </Link>
  );
}

export default RewardCard;
