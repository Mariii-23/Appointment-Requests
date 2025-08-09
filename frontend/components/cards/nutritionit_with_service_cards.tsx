"use client";

import { NutritionistWithServices } from "@/types/nutritionist_with_service";
import React from "react";
import NutritionistWithServiceCard from "../card/nutritionit_with_service_card";

interface NutritionistsCardsProps {
    nutritionists: NutritionistWithServices[];
    onClickScheduleAppointmentHandler: (nutricionId: string, service_id: string) => void;
    onClickWebsiteHandler: (nutricionId: string) => void;
}

const NutritionistWithServicesCards: React.FC<NutritionistsCardsProps> = ({
    nutritionists,
    onClickScheduleAppointmentHandler,
    onClickWebsiteHandler,
}) => {
    return (
        <div className="flex flex-col gap-4 overflow-x-auto py-4">
            {nutritionists.map(nutri => (
                <NutritionistWithServiceCard
                    key={nutri.id}
                    {...nutri}
                    onClickScheduleAppointmentHandler={onClickScheduleAppointmentHandler}
                    onClickWebsiteHandler={onClickWebsiteHandler}
                />
            ))}
        </div>
    );
};

export default NutritionistWithServicesCards;
