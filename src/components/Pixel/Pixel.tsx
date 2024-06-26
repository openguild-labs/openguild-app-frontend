import React from "react";

type Props = {
  color: string | undefined;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const Pixel = ({ color, style, children }: Props) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        backgroundColor: color || "transparent",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Pixel;
