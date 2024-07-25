import RewardCard from "@/components/RewardCard";

function CardContainer() {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-4 mt-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item}>
            <RewardCard />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardContainer;
