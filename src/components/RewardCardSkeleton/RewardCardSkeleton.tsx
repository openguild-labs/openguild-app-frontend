import { Skeleton } from "@mui/material";

function RewardCardSkeleton() {
  return (
    <div>
      <div className="w-full bg-white text-black rounded-lg relative cursor-pointer hover:scale-[102%] duration-200 transition">
        <div className="w-full aspect-square">
          <Skeleton
            variant="rounded"
            animation="wave"
            className="rounded-lg"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className="mt-1">
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80%" }} animation="wave" />
          <Skeleton variant="text" sx={{ fontSize: "0.875rem", width: "40%" }} animation="wave" />
        </div>
      </div>
    </div>
  );
}

export default RewardCardSkeleton;
