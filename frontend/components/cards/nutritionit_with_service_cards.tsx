"use client";

import { NutritionistWithServices } from "@/types/nutritionist_with_service";
import React from "react";
import NutritionistWithServiceCard from "../card/nutritionit_with_service_card";

interface NutritionistsCardsProps {
    nutritionists: NutritionistWithServices[];
}

const NutritionistWithServicesCards: React.FC<NutritionistsCardsProps> = ({ nutritionists }) => {
    return (
        <div className="flex flex-col gap-4 overflow-x-auto py-4">
            {nutritionists.map(nutri => (
                <NutritionistWithServiceCard key={nutri.id} {...nutri} />
            ))}
        </div>
    );
};

export default NutritionistWithServicesCards;
