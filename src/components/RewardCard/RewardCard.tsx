import Tag from "@/components/Tag";
import { REWARDS_PATH } from "@/constants/links";
import CardImg from "@assets/images/card-img.webp";
import { Link } from "react-router-dom";
function RewardCard() {
  return (
    <Link to={`${REWARDS_PATH}/1`}>
      <div className="w-full bg-white text-black rounded-lg shadow-lg pb-[3px] relative cursor-pointer hover:scale-[102%] duration-200 transition">
        <div className="h-[240px] md:h-[160px]">
          <img className="rounded-t-lg w-full h-full object-fill" src={CardImg} alt="CardImg" />
          <div className="absolute top-3 left-3 bg-primary-color text-sm px-3 py-1 rounded-md text-white">NFT</div>

        </div>
        <div className="my-2 ml-2">Archloot AdventurerPass</div>
        <div className="bg-gray-200 mt-3 mb-5 w-full h-[1px]" />
        <div className="flex items-center mb-3 ml-2 gap-1">
          <Tag value="EP 15" />
          <Tag value="Badge Archloot" />
        </div>
      </div>
    </Link>
  );
}

export default RewardCard;
