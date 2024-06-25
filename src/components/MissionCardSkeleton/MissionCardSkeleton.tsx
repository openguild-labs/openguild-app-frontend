import { Skeleton } from "@mui/material";

const MISSION_CARD_HEIGHT = 365;
const THUMBNAIL_HEIGHT = 184;

function MissionCardSkeleton() {
  return (
    <div className="shrink-0 w-full">
      <div
        className="block rounded-lg bg-white w-full shadow-lg hover:scale-[102%] duration-200 transition"
        style={{
          height: MISSION_CARD_HEIGHT,
        }}
      >
        <div
          className=" relative pb-6 "
          style={{
            height: THUMBNAIL_HEIGHT,
          }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="rounded-t-lg"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
          <div className=" absolute left-[28px] bottom-6 translate-y-1/2">
            <Skeleton variant="circular" width={46} height={46} animation="wave" />
          </div>
        </div>
        <div
          className="flex flex-col w-full"
          style={{
            height: MISSION_CARD_HEIGHT - THUMBNAIL_HEIGHT,
          }}
        >
          <div className="py-2 px-4 h-1/3 w-full border-b-[0.5px] border-gray-200 text-black">
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />
          </div>
          <div className="py-2 px-4 h-1/3 w-full border-b-[0.5px] border-gray-200 flex text-black">
            <div className="w-1/2 h-full">
              <div className="h-1/2 flex items-center justify-start">
                <Skeleton variant="text" className="w-full" sx={{ fontSize: ".75rem" }} animation="wave" />
              </div>
              <div className="h-1/2 flex items-center justify-start">
                <Skeleton variant="text" className="w-full" sx={{ fontSize: ".75rem" }} animation="wave" />
              </div>
            </div>
          </div>
          <div className="py-2 px-4 h-1/3 w-full">
            <div className="flex w-full overflow-hidden gap-x-1 text-black">
              <Skeleton variant="rounded" width={80} height={38} animation="wave" />
              <Skeleton variant="rounded" width={80} height={38} animation="wave" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionCardSkeleton;
