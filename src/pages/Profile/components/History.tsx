import SearchInput from "@/components/SearchInput";
import Filter from "@/pages/Rewards/components/Filter";
import nothing from "@assets/images/nothing.png";
function History() {
  return (
    <div>
      <div className="bg-white/10  w-full h-[1px] mt-4" />
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Activities History</div>
      <div className="flex gap-2 items-center mt-3 gap-x-10">
        <SearchInput placeholder="Search name..." />
        <Filter />
      </div>
      <img src={nothing} alt="nothing" className="text-center mx-auto w-[400px] mt-12" />
      <div
        className="font-semibold text-center"
        style={{
          color: "rgb(77, 90, 102)",
        }}
      >
        No history available
      </div>
    </div>
  );
}

export default History;
