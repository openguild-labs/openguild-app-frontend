import { GithubLabel } from "@/utils/github/models";

/* abc*/
export default ({ labels }: { labels: GithubLabel[] }) => (
  <div className="flex flex-wrap items-center text-sm text-gray-400 overflow-hidden">
    {labels.map((label) => (
      <div
        key={label.id}
        style={{ border: `1px solid #${label.color} 50%` || "gray" }}
        className="px-2 bg-gray-100 text-gray-700 rounded m-1 flex justify-center items-center"
      >
        <div style={{ backgroundColor: `#${label.color}` }} className="w-2 h-2 mr-2"></div>
        <span style={{ fontSize: 11 }} className="flex-none">
          {label.name}
        </span>
      </div>
    ))}
  </div>
);
