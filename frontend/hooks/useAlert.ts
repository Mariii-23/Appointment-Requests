"use client";

import { AlertContext } from "@/app/providers/alert-provider";
import { useContext } from "react";

export default function useAlert() {
    return useContext(AlertContext);
}
