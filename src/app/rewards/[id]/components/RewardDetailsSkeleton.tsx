import HeaderDetailsSkeleton from "@/components/HeaderDetailsSkeleton";
import { Skeleton } from "@mui/material";

function RewardDetailsSkeleton() {
  const isDesktop = window.innerWidth > 1024;
  return (
    <div className="mt-[30px] pb-10">
      <div className="flex gap-8 flex-col lg:flex-row">
        {!isDesktop && <HeaderDetailsSkeleton />}
        <div className="w-full md:w-1/2 shrink-0">
          <div className="rounded-xl shadow-lg bg-white p-3 w-full aspect-square flex flex-col gap-y-3 relative">
            <Skeleton
              variant="rounded"
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-8 order-1">
          {isDesktop && <HeaderDetailsSkeleton />}
          <div>
            <div className="flex items-center">
              <div className="text-black text-md font-bold w-[150px]">
                <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={100} />
              </div>
              <h2 className="text-xl text-primary-color">
                <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={50} />
              </h2>
            </div>
            <div className="flex items-center mt-4">
              <div className="text-black text-md font-bold w-[150px]">
                <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={100} />
              </div>
              <div
                className="flex items-center gap-x-2 w-full overflow-x-scroll pb-3"
                style={{
                  maxWidth: isDesktop ? "350px" : "810px",
                }}
              >
                {[1, 2, 3].map((item) => {
                  return <Skeleton key={item} variant="rounded" width={80} height={80} />;
                })}
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Skeleton variant="rounded" sx={{ width: "100%", height: "44px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewardDetailsSkeleton;
