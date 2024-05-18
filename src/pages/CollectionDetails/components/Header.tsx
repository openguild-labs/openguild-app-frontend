import ShareButton from "@/components/ShareButton";
import collectionThumbnail from "@assets/images/collection.webp";
import { Button } from "@headlessui/react";

function Header() {
  return (
    <div className="flex items-center justify-between -translate-y-14">
      <div className="flex items-center">
        <img className="rounded-2xl w-[140px] h-[190px]" src={collectionThumbnail} alt="thumbnail" />
        <div className="ml-4">
          <h1 className="text-4xl mb-4">Space3</h1>
          <div className="flex gap-x-2">
            <div className="px-2 py-[6px] border border-neutral-800 rounded flex items-center justify-center">BNB Chain</div>
            <div className="px-2 py-[6px] border border-neutral-800 rounded flex items-center justify-center">Ancient8</div>
          </div>
        </div>
      </div>
      <div className="flex gap-x-10">
        <ShareButton />
        <Button className="py-[10px] px-[14px] bg-primary-color text-black rounded-lg text-xs flex items-center">Explore More</Button>
      </div>
    </div>
  );
}

export default Header;
