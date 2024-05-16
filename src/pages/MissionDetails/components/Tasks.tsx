import Disclosure from "@/components/Disclosure";
import { Button } from "@headlessui/react";

function Tasks() {
  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <Disclosure />
        <Disclosure />
        <Disclosure />
        <Disclosure />
        <Disclosure />
      </div>
      <div className="flex justify-center">
        <Button className="py-1 px-4 w-[160px] h-[44px] rounded-lg bg-primary-color text-black font-bold text-sm mt-6">Login</Button>
      </div>
      <div className="w-full h-[1px] bg-neutral-800 mt-6" />
    </div>
  );
}

export default Tasks;
