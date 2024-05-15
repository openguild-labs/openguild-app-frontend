import CustomTab from "@/components/CustomTab/CustomTab";
import ActivityList from "./components/ActivityList";
import Banner from "./components/Banner";
import CardContainer from "./components/CardContainer";
import Filter from "./components/Filter";
import Pagination from "@/components/Pagination/Pagination";
import SearchInput from "@/components/SearchInput/SearchInput";

const categories: TCategory[] = [
  {
    name: "All",
  },
  {
    name: "NFT",
  },
  {
    name: "EVM NFT",
  },
  {
    name: "SOL NFT",
  },
  {
    name: "Gift Card",
  },
  {
    name: "Lucky Ticket",
  },
];

function Rewards() {
  return (
    <div className="h-auto mt-3 mb-8">
      <Banner />
      <div className="mt-3 text-[40px] font-semibold text-[#0fdbd1]">Reward Center</div>
      <CustomTab categories={categories} />
      <div className="flex gap-2 items-center mt-3 gap-x-10">
        <SearchInput placeholder="Search by reward, community, badge ..." />
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
