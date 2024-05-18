import bannerEvent from "@assets/images/banner-event.webp";

function Overview() {
  return (
    <div>
      <div className="flex gap-x-12 mt-12">
        <div className="w-1/2">
          <h2 className="text-2xl">Igniting the world's leading Web3 Game Publisher</h2>
          <span className="text-[#4d5a66]">
            Space3 is the leading Game Publisher, reshaping the distribution of millions Web2 and Web3 Games by captivating players through
            gamified experiences built on blockchain.
          </span>
        </div>
        <img className="w-1/2 aspect-video rounded-lg" src={bannerEvent} alt="banner-event" />
      </div>
      <h2 className="text-2xl text-primary-color my-12">Official Links</h2>
      <div className="flex flex-col gap-y-4">
        <div className="p-8 rounded-xl bg-[#0d0f11] flex items-center justify-between font-semibold">
          Website
          <a href="#">https://chaincohort.com/</a>
        </div>
        <div className="p-8 rounded-xl bg-[#0d0f11] flex items-center justify-between font-semibold">
          Website
          <a href="#">https://chaincohort.com/</a>
        </div>
        <div className="p-8 rounded-xl bg-[#0d0f11] flex items-center justify-between font-semibold">
          Website
          <a href="#">https://chaincohort.com/</a>
        </div>
        <div className="p-8 rounded-xl bg-[#0d0f11] flex items-center justify-between font-semibold">
          Website
          <a href="#">https://chaincohort.com/</a>
        </div>
      </div>
    </div>
  );
}

export default Overview;
