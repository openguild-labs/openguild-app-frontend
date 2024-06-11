import RewardCard from "@/components/RewardCard";
import SearchInput from "@/components/SearchInput";

function Rewards() {
  return (
    <div>
      <SearchInput placeholder="Search by community, tag, badge, name, ..." />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -mx-2 gap-y-4 mt-6 mt-3">
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
