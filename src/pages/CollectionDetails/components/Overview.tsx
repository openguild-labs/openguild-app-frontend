import bannerEvent from "@assets/images/banner-event.webp";

function Overview() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div className="flex flex-col w-full gap-2 h-full justify-center">
          <h2 className="text-2xl">Igniting the world's leading Web3 Game Publisher</h2>
          <span className="text-gray-400">
            Space3 is the leading Game Publisher, reshaping the distribution of millions Web2 and Web3 Games by captivating players through
            gamified experiences built on blockchain.
          </span>
        </div>
        <div>
          <img className="w-full aspect-video rounded-lg" src={bannerEvent} alt="banner-event" />
        </div>
      </div>
      <h2 className="text-2xl text-primary-color my-12">Official Links</h2>
      <div className="flex flex-col gap-y-4">
        <div className="p-8 rounded-xl shadow-lg flex items-center justify-between font-semibold">
          Website
          <a href="#">https://openguild.wtf/</a>
        </div>
        <div className="p-8 rounded-xl shadow-lg flex items-center justify-between font-semibold">
          Website
          <a href="#">https://openguild.wtf/</a>
        </div>
        <div className="p-8 rounded-xl shadow-lg flex items-center justify-between font-semibold">
          Website
          <a href="#">https://openguild.wtf/</a>
        </div>
        <div className="p-8 rounded-xl shadow-lg flex items-center justify-between font-semibold">
          Website
          <a href="#">https://openguild.wtf/</a>
        </div>
      </div>
    </div>
  );
}

export default Overview;
