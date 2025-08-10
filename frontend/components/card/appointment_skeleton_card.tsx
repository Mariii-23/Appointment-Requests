"use client";

import React from "react";
import CardWithButtonLayout from "@/app/layouts/card-with-button-layout";

const AppointmentCardSkeleton = () => {
    return (
        <CardWithButtonLayout buttonText="..." onButtonClick={() => {}}>
            <div className="flex flex-row gap-8 animate-pulse">
                <div>
                    <div className="w-20 h-20 bg-gray-300 rounded-full" />
                </div>

                <div className="flex flex-col w-full gap-2">
                    <div className="card-title h-3 bg-gray-300 rounded w-1/2" />
                    <div className="h-2 bg-gray-300 rounded w-1/3" />
                    <div className="h-2 bg-gray-300 rounded w-1/3" />
                </div>
            </div>
        </CardWithButtonLayout>
    );
};

export default AppointmentCardSkeleton;
