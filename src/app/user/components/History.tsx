import SearchInput from "@/components/SearchInput";
import Filter from "./Filter";

function History() {
  return (
    <div>
      <div className="bg-white/10  w-full h-[1px] mt-4" />
      <div className="text-primary-color text-2xl font-bold mt-12 mb-6">Activities History</div>
      <div className="block md:flex justify-center items-center mt-3 gap-x-8">
        <SearchInput placeholder="Search name..." />
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
        No history available
      </div>
    </div>
  );
}

export default History;
