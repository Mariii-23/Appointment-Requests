import React, { ReactNode } from "react";

type BodyLayoutProps = {
    children: ReactNode;
};

const BodyLayout: React.FC<BodyLayoutProps> = ({ children }) => {
    return <div className="p-16 pb-4">{children}</div>;
};

export default BodyLayout;
