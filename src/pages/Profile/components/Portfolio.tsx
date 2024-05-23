import SearchInput from "@/components/SearchInput";
import Filter from "@/pages/Rewards/components/Filter";
import nothing from "@assets/images/nothing.png";

function Portfolio() {
  return (
    <div>
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Points</div>
      <div className="grid grid-cols-7 w-full">
        <div className="text-[#ffffff73] text-semibold col-span-2">Name</div>
        <div className="text-[#ffffff73] text-semibold col-span-1">Ticket</div>
        <div className="text-[#ffffff73] text-semibold col-span-1">Balance</div>
        <div className="text-[#ffffff73] text-semibold col-span-1">Expiring Balance</div>
        <div className="text-[#ffffff73] text-semibold col-span-2">Community Issue</div>
      </div>
      <div className="bg-white/10  w-full h-[1px] my-4" />
      <div className="grid grid-cols-7 w-full">
        <div className="text-[#fff] col-span-2">Energy Point</div>
        <div className="text-[#fff] col-span-1">EP</div>
        <div className="text-[#fff] col-span-1">1</div>
        <div className="text-[#fff] col-span-1">1 </div>
        <div className="text-[#fff] col-span-2">Space3 Issue</div>
      </div>
      <div className="bg-white/10  w-full h-[1px] my-4" />
      <div className="grid grid-cols-7 w-full">
        <div className="text-[#fff] col-span-2">Energy Point</div>
        <div className="text-[#fff] col-span-1">EP</div>
        <div className="text-[#fff] col-span-1">1</div>
        <div className="text-[#fff] col-span-1">1 </div>
        <div className="text-[#fff] col-span-2">Space3 Issue</div>
      </div>
      <div className="bg-white/10  w-full h-[1px] mt-4" />
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Items</div>
      <div className="flex gap-2 items-center mt-3 gap-x-10">
        <SearchInput placeholder="Search items name..." />
        <Filter />
      </div>
      <img src={nothing} alt="nothing" className="text-center mx-auto w-[400px] mt-12" />
      <div
        className="font-semibold text-center"
        style={{
          color: "rgb(77, 90, 102)",
        }}
      >
        No item available
      </div>{" "}
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Achievements</div>
      <div className="flex gap-2 items-center mt-3 gap-x-10">
        <SearchInput placeholder="Search items name..." />
        <Filter />
      </div>
      <img src={nothing} alt="nothing" className="text-center mx-auto w-[400px] mt-12" />
      <div
        className="font-semibold text-center"
        style={{
          color: "rgb(77, 90, 102)",
        }}
      >
        No achievement available
      </div>{" "}
    </div>
  );
}

export default Portfolio;
