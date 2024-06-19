function ActivityList() {
  const data = Array(8).fill({
    time: "2:22",
    item: "Lucky Ticket to Share 100 Guaranteed Whitelists to FREE-MINT Hairy the Bene NFT",
    buyer: "65f9",
  });
  return (
    <div className="hidden lg:block bg-white shadow-lg rounded-md p-4 w-[280px] shrink-0">
      <div className="text-primary-color">Activity List</div>
      <div className="grid grid-cols-6 gap-x-4 gap-y-1 mx-auto pt-3 ">
        <div className="col-span-1 text-sm text-black">Time</div>
        <div className="col-span-4 text-sm text-black">Item</div>
        <div className="col-span-1 text-sm text-black">Buyer</div>
        <div className="col-span-6 bg-gray-200 mt-1 mb-1 w-full h-[1px]" />
      </div>
      <div className="[&_:first-child]:border-none">
        {data.map((item, index) => (
          <div key={index} className="grid grid-cols-6 gap-4 py-3 border-t">
            <div className="col-span-1 text-sm text-gray-400">{item.time}</div>
            <div className="col-span-4 text-sm text-black">{item.item?.slice(0, 36)}...</div>
            <div className="col-span-1 text-sm text-black">{item.buyer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityList;
