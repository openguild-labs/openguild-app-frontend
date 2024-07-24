import { Skeleton } from "@mui/material";

function TasksSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-y-4">
        {[1, 2, 3].map((index) => {
          return (
            <Skeleton
              key={index}
              variant="rounded"
              sx={{
                width: "100%",
                height: "50px",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TasksSkeleton;
