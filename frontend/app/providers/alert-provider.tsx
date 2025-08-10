"use client";

import React, { ReactNode, useState } from "react";
import SuccessAlert from "@/components/alert/sucess_alert";
import ErrorAlert from "@/components/alert/error_alert";

type AlertType = { type: "success" | "error"; message: string } | null;

export const AlertContext = React.createContext<
    (type: "success" | "error", message: string) => void
>(() => {});

export default function AlertProvider({ children }: { children: ReactNode }) {
    const [alert, setAlert] = useState<AlertType>(null);

    const showAlert = (type: "success" | "error", message: string) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 3000);
    };

    return (
        <AlertContext.Provider value={showAlert}>
            <div className="fixed top-15 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
                {alert?.type === "success" && <SuccessAlert title={alert.message} />}
                {alert?.type === "error" && <ErrorAlert title={alert.message} />}
            </div>

            {children}
        </AlertContext.Provider>
    );
}
