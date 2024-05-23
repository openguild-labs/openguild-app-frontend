import RewardCard from "@/components/RewardCard";

function CardContainer() {
  return (
    <div>
      {" "}
      <div className="flex h-full gap-4 mb-4 flex-wrap mt-8">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="w-[22%]">
            <RewardCard />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardContainer;
