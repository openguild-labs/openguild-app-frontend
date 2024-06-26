import { HTMLAttributes } from "react";
import clsx from "clsx";

interface ITagProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  size?: "medium" | "large";
}

function Tag({ value, size = "medium", className, ...props }: ITagProps) {
  const words = value?.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");
  return (
    <div
      className={clsx("flex gap-1 rounded-md border border-gray-300 w-auto px-3 py-[6px] leading-6", className)}
      {...props}
      style={{
        fontSize: size === "large" ? "1.25rem" : "0.875rem",
      }}
    >
      <span className="text-primary-color inline-block">{firstWord}</span> {restWords}
    </div>
  );
}

export default Tag;
