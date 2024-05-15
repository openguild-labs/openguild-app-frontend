interface ITagProps {
  value: string;
}

function Tag({ value }: ITagProps) {
  const words = value.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");
  return (
    <div className="flex gap-1 rounded-md border border-white/20 w-auto px-3 py-1 text-sm">
      <span className="text-[#0fdbd1] inline-block">{firstWord}</span> {restWords}
    </div>
  );
}

export default Tag;
