import SearchInput from "@/components/SearchInput";
import Filter from "@/abc/Rewards/components/Filter";
import Image from "next/image";

function Portfolio() {
  return (
    <div>
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Points</div>
      <div className="hidden md:grid grid-cols-7 w-full">
        <div className="text-semibold col-span-2">Name</div>
        <div className="text-semibold col-span-1">Ticket</div>
        <div className="text-semibold col-span-1">Balance</div>
        <div className="text-semibold col-span-1">Expiring Balance</div>
        <div className="text-semibold col-span-2">Community Issue</div>
      </div>
      <div className="hidden md:block">
        <div className="bg-gray-200  w-full h-[1px] my-4" />
        <div className="grid grid-cols-7 w-full">
          <div className="col-span-2">Energy Point</div>
          <div className="col-span-1">EP</div>
          <div className="col-span-1">1</div>
          <div className="col-span-1">1</div>
          <div className="col-span-2">Space3 Issue</div>
        </div>
        <div className="bg-gray-200 w-full h-[1px] my-4" />
        <div className="grid grid-cols-7 w-full">
          <div className="col-span-2">Energy Point</div>
          <div className="col-span-1">EP</div>
          <div className="col-span-1">1</div>
          <div className="col-span-1">1</div>
          <div className="col-span-2">Space3 Issue</div>
        </div>
        <div className="bg-white/10  w-full h-[1px] mt-4" />
      </div>
      <div className="block md:hidden [&_:not(:first-child)]:!border-none">
        <div className="py-3 border-b-[1px] border-gray-200">
          <div className="flex w-full justify-between">
            <div>Energy Point</div>
            <div className="text-primary-color">EP</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-gray-500 text-semibold">Balance</div>
            <div>1</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-gray-500 text-semibold">Expiring Balance</div>
            <div>1</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-gray-500 text-semibold">Community Issue</div>
            <div>Space3 Issue</div>
          </div>
        </div>
        <div className="py-3 border-b-[1px] border-gray-200">
          <div className="flex w-full justify-between">
            <div>Energy Point</div>
            <div className="text-primary-color">EP</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-gray-500 text-semibold">Balance</div>
            <div>1</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-gray-500 text-semibold">Expiring Balance</div>
            <div>1</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-gray-500 text-semibold">Community Issue</div>
            <div>Space3 Issue</div>
          </div>
        </div>
      </div>
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Items</div>
      <div className="block md:flex justify-center items-center mt-3 gap-x-8">
        <SearchInput placeholder="Search items name..." />
      </div>
      <img src={"/assets/images/banner.webp"} alt="nothing" className="text-center mx-auto w-[400px] mt-12" />
      <div
        className="font-semibold text-center"
        style={{
          color: "rgb(77, 90, 102)",
        }}
      >
        No item available
      </div>{" "}
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Achievements</div>
      <div className="block md:flex justify-center items-center mt-3 gap-x-8">
        <SearchInput placeholder="Search items name..." />
        <div className="mt-4 md:mt-0 text-end max-[767px]:[&_>_button]:w-full">
          <Filter />
        </div>
      </div>
      <img src={"/assets/images/banner.webp"} alt="nothing" className="text-center mx-auto w-[400px] mt-12" />
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
