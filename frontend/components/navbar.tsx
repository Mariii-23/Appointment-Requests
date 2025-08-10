"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { PATHS } from "@/constants/paths";
import { logout } from "@/store/authSlice";
import type { RootState, AppDispatch } from "@/store";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { t , i18n} = useTranslation("components/navbar");

    const nutritionist = useSelector((state: RootState) => state.auth.nutritionist);

    const handleLogout = () => {
        dispatch(logout());
        router.push(PATHS.HOME);
    };

      const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

    return (
        <div className="bg-gradient-to-r from-terciary-green via-secondary-green to-primary-green transition-colors duration-500 ease-in-out flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm" onClick={() => router.push(PATHS.HOME)}>
                <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
            </div>

            <div className="flex gap-2">
            {!nutritionist ? (
                <a
                    className="text-white text-sm font-light flex items-center space-x-1 hover:underline"
                    onClick={() => router.push(PATHS.LOGIN)}
                >
                    <span>{t("areYouNutritionist")}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            ) : (
                <div className="flex items-center space-x-4 text-white text-sm">
                    <span>{t("welcome", { name: nutritionist.name })}</span>
                    <button className="btn btn-terciary" onClick={handleLogout}>
                        {t("logout")}
                    </button>
                </div>
            )}
  <select
        onChange={handleLanguageChange}
        value={i18n.language}
        className="ml-4 rounded bg-white text-black p-1"
        aria-label={t("select_language")}
      >
        <option value="en">English</option>
        <option value="pt">Português</option>
    </select>
</div>
        </div>
    );
};

export default Navbar;
