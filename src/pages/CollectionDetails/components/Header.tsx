import ShareButton from "@/components/ShareButton";
import collectionThumbnail from "@assets/images/collection.webp";
import { Button } from "@headlessui/react";

function Header() {
  return (
    <div className="flex items-center justify-center md:justify-between -translate-y-14 md:pl-4 md:pl-8">
      <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-lg">
        <img className="w-[140px] mt-[-1px] ml-[-1px]" src={collectionThumbnail} alt="thumbnail" />
        <div className="mx-4">
          <h1 className="text-4xl mb-4">Space3</h1>
          <div className="flex gap-x-2">
            <div className="px-2 py-[3px] border border-neutral-800 rounded flex items-center justify-center text-xs">BNB
              Chain
            </div>
            <div className="px-2 py-[6px] border border-neutral-800 rounded flex items-center justify-center text-xs">Ancient8
            </div>
          </div>
          <div className="flex md:!hidden gap-x-2 mt-3">
            <ShareButton className="[&_.text]:hidden"/>
            <Button className="py-[10px] px-[14px] bg-primary-color text-white rounded-lg text-xs flex items-center">Explore</Button>
          </div>

        </div>
      </div>
      <div className="hidden md:flex gap-x-10 ">
        <ShareButton />
        <Button className="py-[10px] px-[14px] bg-primary-color text-white rounded-lg text-xs flex items-center">Explore
          More</Button>
      </div>
    </div>
  );
}

export default Header;
