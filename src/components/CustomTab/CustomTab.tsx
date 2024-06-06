import { Tab, TabGroup, TabList } from "@headlessui/react";

interface TTabProps {
  options: TOption[];
  onChange?: (index: number) => void;
}

export default function CustomTab({ options, onChange }: TTabProps) {
  return (
    <>
      <div className="flex w-full pt-4 ">
        <div className="w-full ">
          <TabGroup>
            <TabList className="flex gap-2">
              {options.map(({ name }, index) => (
                <Tab
                  key={name}
                  onClick={() => onChange && onChange(index)}
                  className="rounded-full py-1 px-5 text-md/6 font-semibold text-white focus:outline-none data-[selected]:text-primary-color data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  {name}
                </Tab>
              ))}
            </TabList>
          </TabGroup>
        </div>
      </div>
      <div className="bg-[#1c2023] mt-3 w-full h-[1px]" />
    </>
  );
}