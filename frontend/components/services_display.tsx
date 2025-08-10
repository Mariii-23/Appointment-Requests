import { Service } from "@/types/service";
import React, { useMemo, useState } from "react";
import MapPinIcon from "./icons/map-pin-icon";
import BankNotesIcon from "./icons/bank-notes-icon";
import WalletIcon from "./icons/wallet-icon";
import { useTranslation } from "react-i18next";

type ServicesDisplayProps = {
    services: Service[];
    onServiceChange?: (selectedServiceId: string) => void;
};

const ServicesDisplay = ({ services, onServiceChange }: ServicesDisplayProps) => {
    const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || "");
    const { t  } = useTranslation("components/services_display");

    const selectedService = useMemo(() => {
        return services.find(s => s.id == selectedServiceId);
    }, [selectedServiceId, services]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedServiceId(e.target.value);
        if (onServiceChange) {
            onServiceChange(selectedServiceId);
        }
    };

    if (!selectedService) return null;

    return (
        <div className="flex flex-row justify-between items-center w-full ">
            <div className="flex flex-row gap-2">
                <MapPinIcon />
                <div className="flex flex-col gap-4">
                    <h1>{t("followUp")}</h1>
                    <span>{selectedService.location}</span>
                </div>
            </div>

            <div className="flex flex-col gap-4 min-w-[280px] max-w-full">
                <div className="flex flex-row gap-2 items-center">
                    <WalletIcon />
                    <select
                        className="select select-ghost m-0 p-0 w-64 sm:w-full"
                        value={selectedServiceId}
                        onChange={handleChange}
                    >
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <BankNotesIcon />
                    <span className="text-sm font-medium">
                        €{selectedService.price_euros.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ServicesDisplay;
