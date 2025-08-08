import React, { ReactNode } from "react";

type BannerLayoutProps = {
  children: ReactNode;
};

const BannerLayout: React.FC<BannerLayoutProps> = ({ children }) => {
  return (
    <div className="relative px-16 py-8 flex items-center justify-between">
      {/* background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-terciary-green via-secondary-green to-primary-green transition-colors duration-500 ease-in-out" />
      {/* overlay escuro */}
      <div className="absolute inset-0 bg-black opacity-10" />
      {/* conteúdo, acima do overlay */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default BannerLayout;
