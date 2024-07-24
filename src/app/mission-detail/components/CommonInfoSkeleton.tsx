import { Skeleton } from "@mui/material";

function CommonInfoSkeleton() {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="rounded-xl shadow-lg bg-white p-3 w-full flex flex-col gap-y-3 relative">
        <div className="w-full aspect-square">
          <Skeleton
            variant="rounded"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className="flex gap-x-2">
          <Skeleton variant="rounded" width={96} height={38} />
          <Skeleton variant="rounded" width={96} height={38} />
        </div>
      </div>
    </div>
  );
}

export default CommonInfoSkeleton;
