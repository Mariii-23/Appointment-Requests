import React, { ReactNode } from "react";

type BpdyLayoutProps = {
  children: ReactNode;
};

const BodyLayout: React.FC<BpdyLayoutProps> = ({ children }) => {
  return (
    <div className="p-16">
      {children}
    </div>
  );
};

export default BodyLayout;
