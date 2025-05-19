import React from "react";

type Props = {
  children: React.ReactNode;
};

const CustomLayout = ({ children }: Props) => {
  return <div className="max-w-[1600px] m-auto">{children}</div>;
};

export default CustomLayout;
