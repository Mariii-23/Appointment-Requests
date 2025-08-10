"use client";

import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store";
import { PATHS } from "@/constants/paths";

type PrivatePageLayoutProps = {
    children: ReactNode;
};

const PrivateRoute: React.FC<PrivatePageLayoutProps> = ({ children }) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (!token) {
            router.push(PATHS.LOGIN);
        }
    }, [token, router]);

    if (!token) {
        return null;
    }

    return <>{children}</>;
};

export default PrivateRoute;
