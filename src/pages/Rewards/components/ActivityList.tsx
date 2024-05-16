function ActivityList() {
  const data = Array(8).fill({
    time: "2:22",
    item: "Lucky Ticket to Share 100 Guaranteed Whitelists to FREE-MINT Hairy the Bene NFT",
    buyer: "65f9",
  });
  return (
    <div className="bg-[#0d0f11] rounded-md p-4 w-[280px] shrink-0	">
      <div className="text-primary-color">Activity List</div>
      <div className="grid grid-cols-6 gap-4 mx-auto pt-3 ">
        <div className="col-span-1 text-sm text-white/40">Time</div>
        <div className="col-span-4 text-sm text-white/40">Item</div>
        <div className="col-span-1 text-sm text-white/40">Buyer</div>
        <div className="col-span-6 bg-[#1c2023] mt-1 mb-1 w-full h-[1px]" />
        {data.map((item) => (
          <>
            <div className="col-span-1 text-sm ">{item.time}</div>
            <div className="col-span-4 text-sm ">{item.item?.slice(0, 36)}...</div>
            <div className="col-span-1 text-sm ">{item.buyer}</div>
            <div className="col-span-6 bg-[#1c2023] mt-1 mb-1 w-full h-[1px]" />
          </>
        ))}
      </div>
    </div>
  );
}

export default ActivityList;
