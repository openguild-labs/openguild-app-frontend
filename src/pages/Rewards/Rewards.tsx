import ActivityList from "./components/ActivityList";
import Banner from "./components/Banner";
import CardContainer from "./components/CardContainer";
import Filter from "./components/Filter";
import Pagination from "./components/Pagination";
import RewardsTab from "./components/RewardsTab";
import SearchInput from "./components/SearchInput";

function Rewards() {
  return (
    <div className="h-auto mt-3 mb-8">
      <Banner />
      <div className="mt-3 text-[40px] font-semibold text-[#0fdbd1]">Reward Center</div>
      <RewardsTab />
      <div className="bg-[#1c2023] mt-3 w-full h-[1px]" />
      <div className="flex gap-2 items-center mt-3">
        <SearchInput />
        <Filter />
      </div>
      <div className="flex mt-4 items-start">
        <CardContainer />
        <ActivityList />
      </div>
      <Pagination />
    </div>
  );
}

export default Rewards;
