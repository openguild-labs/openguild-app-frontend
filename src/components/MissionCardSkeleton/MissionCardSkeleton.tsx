import { Skeleton } from "@mui/material";

function MissionCardSkeleton() {
  return (
    <div className="shrink-0 w-full">
      <div className="block rounded-lg bg-white w-full p-2">
        <div className="relative w-full  aspect-square">
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="rounded-md"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className="flex flex-col w-full gap-y-2 mt-2">
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "90%" }} animation="wave" />

          <Skeleton variant="text" className="w-full" sx={{ fontSize: ".75rem", maxWidth: "50%" }} animation="wave" />

          <div className="flex w-full overflow-hidden gap-x-1 text-black">
            <Skeleton variant="rounded" width={80} height={38} animation="wave" />
            <Skeleton variant="rounded" width={80} height={38} animation="wave" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionCardSkeleton;
