import { Skeleton } from "@mui/material";

function HeaderDetailsSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4">
          <Skeleton variant="circular" width={46} height={46} />
          <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} width={68} />
        </div>
        <Skeleton variant="rounded" width={88} height={38} />
      </div>
      <Skeleton variant="text" sx={{ fontSize: "3rem" }} className="mt-4 w-full" />
    </div>
  );
}

export default HeaderDetailsSkeleton;
