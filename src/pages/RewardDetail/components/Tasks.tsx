import Tag from "@/components/Tag";
import { Button } from "@headlessui/react";
import reqImg from "@assets/images/req.webp";
function Tasks() {
  return (
    <div>
      <div className="flex flex-col gap-y-4"></div>
      <div className="flex items-center gap-16">
        <div className="text-white text-md font-bold w-[163px]">Price:</div>
        <Tag size="large" value="EP 5" className="w-fit" />
      </div>
      <div className="w-full h-[1px] bg-neutral-800 mt-6" />
      <div className="flex items-center gap-16 mt-4">
        <div className="text-white text-md font-bold w-[163px]">Requirements:</div>
        <img src={reqImg} alt="reqImg" className="w-24 h-24 rounded" />
      </div>
      <div className="w-full h-[1px] bg-neutral-800 mt-6" />{" "}
      <div className="flex items-center gap-16 mt-4">
        <div className="text-white text-md font-bold w-[163px]">NFT Whitelist:</div>
        <div className="px-8 font-semibold py-1 text-black text-lg bg-[#6b3ffd] rounded-md">Ancient list</div>
      </div>
      <div className="w-full h-[1px] bg-neutral-800 mt-6" />
      <div className="flex justify-center">
        <Button className="py-1 px-4 w-[160px] h-[44px] w-full rounded-lg bg-white/10 text-[#db4646] font-bold text-sm mt-6">Sold out</Button>
      </div>
      <div className="w-full h-[1px] bg-neutral-800 mt-6" />
    </div>
  );
}

export default Tasks;
