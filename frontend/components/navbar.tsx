"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { PATHS } from "@/constants/paths";
import { logout } from "@/store/authSlice";
import type { RootState, AppDispatch } from "@/store";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./language_selector";
import ArrowRigthIcon from "./icons/arrow-rigth";

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation("components/navbar");

    const nutritionist = useSelector((state: RootState) => state.auth.nutritionist);

    const handleLogout = () => {
        dispatch(logout());
        router.push(PATHS.HOME);
    };

    const handleLGoToDashboard = () => {
        router.push(PATHS.NUTRITIONISTS_DASHBOARD);
    };

    return (
        <div className="bg-gradient-to-r from-terciary-green via-secondary-green to-primary-green transition-colors duration-500 ease-in-out flex items-center justify-between px-8 py-4">
            <div
                className="flex items-center space-x-2 text-white font-semibold text-sm"
                onClick={() => router.push(PATHS.HOME)}
            >
                <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
            </div>

            <div className="flex gap-2">
                <LanguageSelector />
                {!nutritionist ? (
                    <a
                        className="text-white text-sm font-light flex items-center space-x-1 hover:underline"
                        onClick={() => router.push(PATHS.LOGIN)}
                    >
                        <span className="text-sm font-bold">{t("areYouNutritionist")}</span>
                        <span className="text-sm font-bold">{t("knowOurSoftware")}</span>
                        <ArrowRigthIcon color="white" />
                    </a>
                ) : (
                    <div className="flex items-center space-x-4 text-white text-sm">
                        <span>{t("welcome", { name: nutritionist.name })}</span>
                        <button className="btn btn-ghost" onClick={handleLGoToDashboard}>
                            {t("dashboard")}
                        </button>
                        <button className="btn btn-ghost" onClick={handleLogout}>
                            {t("logout")}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
