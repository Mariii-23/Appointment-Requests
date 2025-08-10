"use client";

import { NutritionistWithServices } from "@/types/nutritionist_with_service";
import React, { useState } from "react";
import Avatar from "../avatar";
import StarIcon from "../icons/star-icon";
import ServicesDisplay from "../services_display";
import CardLayout from "@/app/layouts/card-layout";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "@/utils/common";

interface NutritionistCardProps extends NutritionistWithServices {
    onClickScheduleAppointmentHandler: (nutricionId: string, service_id: string) => void;
    onClickWebsiteHandler?: (nutricionId: string) => void;
}

const NutritionistWithServiceCard = ({
    id,
    name,
    email,
    services,
    onClickScheduleAppointmentHandler,
    onClickWebsiteHandler,
}: NutritionistCardProps) => {
    const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || "");
    const { t } = useTranslation("common");

    const handleServiceChange = (serviceId: string) => {
        setSelectedServiceId(serviceId);
    };

    return (
        <CardLayout>
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-colom gap-8">
                    <div>
                        <Avatar name={name} />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <div className="badge p-2 badge-primary flex items-center gap-2">
                            <StarIcon size={24} />
                            <span>{t("followUp").toLocaleUpperCase()}</span>
                        </div>
                        <h2 className="card-title">{name}</h2>
                        {email && <p>{email}</p>}
                    </div>
                </div>

                <div className="card-actions justify-between w-100">
                    <button
                        className="btn btn-secondary-card btn-sm w-full"
                        onClick={() => onClickScheduleAppointmentHandler(id, selectedServiceId)}
                    >
                        <div className="flex flex-row gap-2">
                            <div>
                        {capitalizeFirstLetter(t("schedule"))}
                            </div>
                            <div>
                        {capitalizeFirstLetter(t("appointment"))}
</div>
                        </div>
                    </button>
                    {onClickWebsiteHandler &&
                    <button
                        className="btn btn-primary-card btn-sm w-full"
                        onClick={() => onClickWebsiteHandler(id)}
                    >
                        {capitalizeFirstLetter(t("website"))}
                    </button>
                    }
                </div>
            </div>

            <div className="justify-center items-center pl-[5%] pr-[10%] sm:pl-[8%] sm:pr-[20%]">
                <ServicesDisplay services={services} onServiceChange={handleServiceChange} />
            </div>
        </CardLayout>
    );
};

export default NutritionistWithServiceCard;
