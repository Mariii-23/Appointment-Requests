"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { PATHS } from "@/constants/paths";
import { logout } from "@/store/authSlice";
import type { RootState, AppDispatch } from "@/store";

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const nutritionist = useSelector((state: RootState) => state.auth.nutritionist);

    const handleLogout = () => {
        dispatch(logout());
        router.push(PATHS.HOME);
    };

    return (
        <div className="bg-gradient-to-r from-terciary-green via-secondary-green to-primary-green transition-colors duration-500 ease-in-out flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-2 text-white font-semibold text-sm" onClick={() => router.push(PATHS.HOME)}>
                <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
            </div>

            {!nutritionist ? (
                <a
                    className="text-white text-sm font-light flex items-center space-x-1 hover:underline"
                    onClick={() => router.push(PATHS.LOGIN)}
                >
                    <span>Are you a nutrition professional? Get to know our software</span>
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
                    <span>Welcome, {nutritionist.name}</span>
                    <button className="btn btn-terciary" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
