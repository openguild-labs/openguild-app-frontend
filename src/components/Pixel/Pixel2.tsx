import React from "react";

type Props = {
  color: string | undefined;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const Pixel2 = ({ color, style, children }: Props) => {
  return (
    <div
      style={{
        width: 3,
        height: 3,
        backgroundColor: color || "transparent",
        ...style,
      }}
      className="text-white"
    >
      {children}
    </div>
  );
};

export default Pixel2;
