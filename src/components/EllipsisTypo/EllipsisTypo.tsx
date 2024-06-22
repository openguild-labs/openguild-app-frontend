import { useResizeDetector } from "react-resize-detector";

interface IEllipsisTypoProps {
  text: React.ReactNode;
}

function EllipsisTypo({ text }: IEllipsisTypoProps) {
  const { width, ref } = useResizeDetector();
  return (
    <div className="flex-1" ref={ref}>
      <span
        className="text-ellipsis line-clamp-1 text-base text-start"
        style={{
          width: width ? width - 20 : "auto",
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default EllipsisTypo;
