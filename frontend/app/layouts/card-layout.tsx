import React, { ReactNode } from "react";

type CardLayoutProps = {
  children: ReactNode;
};

const CardLayout: React.FC<CardLayoutProps> = ({ children }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm w-full">
      <div className="card-body flex flex-col gap-4 w-full">
        {children}
      </div>
    </div>
  );
};

export default CardLayout;
