import RewardCard from "@/components/RewardCard";
import SearchInput from "@/components/SearchInput";

function Rewards() {
  return (
    <div>
      <SearchInput placeholder="Search by community, tag, badge, name, ..." />
      <div className="flex flex-wrap -mx-2 gap-y-4 mt-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
          return (
            <div key={item}>
              <RewardCard key={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rewards;
