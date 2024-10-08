import clsx from "clsx";
import { HTMLAttributes } from "react";

interface ITagProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  size?: "medium" | "large";
  isWholeWord?: boolean;
}

function Tag({ value, size = "medium", isWholeWord, className, ...props }: ITagProps) {
  const words = value?.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");
  return (
    <div
      className={clsx("flex gap-1 font-medium rounded-2xl border border-gray-300 w-auto px-2 py-[4px] leading-6", className)}
      {...props}
      style={{
        fontSize: size === "large" ? "1rem" : "0.675rem",
      }}
    >
      {isWholeWord ? (
        <span className="inline-block text-nowrap">{value}</span>
      ) : (
        <>
          <span className="text-primary-color inline-block">{firstWord}</span> {restWords}
        </>
      )}
    </div>
  );
}

export default Tag;
