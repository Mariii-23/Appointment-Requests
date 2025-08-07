"use client";

import { NutritionistWithServices } from "@/types/nutritionist_with_service";
import React from "react";

type NutritionistCardProps = NutritionistWithServices;

const NutritionistWithServiceCard: React.FC<NutritionistCardProps> = ({
    id,
    name,
    email,
    services,
}) => {
    return (
        <div key={id} className="card bg-base-100 w-96 shadow-sm w-full">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                {email && <p>{email}</p>}

                <h3 className="font-semibold mt-2">Services:</h3>
                <ul className="list-disc list-inside">
                    {services.map(service => (
                        <li key={service.id}>
                            {service.name} - €{service.price_euros} ({service.location})
                        </li>
                    ))}
                </ul>

                <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary btn-sm">Book Appointment</button>
                    <button className="btn btn-outline btn-sm">Website</button>
                </div>
            </div>
        </div>
    );
};

export default NutritionistWithServiceCard;
