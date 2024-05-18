import RewardCard from "@/components/RewardCard";

function CardContainer() {
  return (
    <div>
      {" "}
      <div className="flex h-full gap-4 mb-4 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div key={item} className="w-[31%]">
            <RewardCard />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardContainer;
