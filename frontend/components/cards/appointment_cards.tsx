"use client";

import React from "react";
import { Appointment } from "@/types/appointment";
import AppointmentCard from "../card/appointment_card";

interface AppointmentCardsProps {
    appointments: Appointment[];
}

const AppointmentCards: React.FC<AppointmentCardsProps> = ({
    appointments,
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
            {appointments.map(appointment => (
                <AppointmentCard
                    key={appointment.id}
                    {...appointment}
                    openModal={() => {}}
                />
            ))}
        </div>
    );
};

export default AppointmentCards;
