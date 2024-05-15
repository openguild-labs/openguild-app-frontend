import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const categories = [
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

export default function RewardsTab() {
  return (
    <div className="flex w-full pt-4 ">
      <div className="w-full ">
        <TabGroup>
          <TabList className="flex gap-2">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className="rounded-full py-1 px-5 text-md/6 font-semibold text-white focus:outline-none data-[selected]:text-[#0fdbd1] data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                {name}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>
    </div>
  );
}
