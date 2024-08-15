/* abc*/
export default ({ items }: { items: any[] }) => (
  <div className="flex items-center gap-x-3 mt-5 text-sm text-gray-400 overflow-hidden">
    {items.slice(0, 3).map((item, idx) => (
      <div className="bg-slate-800 px-3 rounded">
        <span style={{ fontSize: 10 }} className="flex-none">
          {item}
        </span>
      </div>
    ))}
  </div>
);
