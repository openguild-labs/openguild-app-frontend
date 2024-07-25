import { Skeleton } from "@mui/material";

function RewardCardSkeleton() {
  return (
    <div>
      <div className="w-full bg-white text-black rounded-lg shadow-lg pb-[3px] relative cursor-pointer hover:scale-[102%] duration-200 transition">
        <div className="h-[240px] md:h-[200px] p-2">
          <Skeleton
            variant="rounded"
            animation="wave"
            className="rounded-t-lg"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className="py-2 px-4 line-clamp-2 h-12">
          <Skeleton variant="rounded" sx={{ height: "100%" }} animation="wave" />
        </div>
      </div>
    </div>
  );
}

export default RewardCardSkeleton;
