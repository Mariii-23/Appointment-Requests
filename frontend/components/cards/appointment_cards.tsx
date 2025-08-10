"use client";

import React from "react";
import { Appointment } from "@/types/appointment";
import AppointmentCard from "../card/appointment_card";
import AppointmentCardSkeleton from "../card/appointment_skeleton_card";

interface AppointmentCardsProps {
    appointments: Appointment[];
    onAnswerRequestAppointmentClick: (appointment: Appointment) => void;
    minAppointments?: number;
}

const AppointmentCards = ({
    appointments,
    onAnswerRequestAppointmentClick,
    minAppointments,
}: AppointmentCardsProps) => {
    const missingCount =
        minAppointments && appointments.length < minAppointments
            ? minAppointments - appointments.length
            : 0;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
            {appointments.map(appointment => (
                <AppointmentCard
                    key={appointment.id}
                    {...appointment}
                    onAnswerRequestAppointmentClick={onAnswerRequestAppointmentClick}
                />
            ))}

            {Array.from({ length: missingCount }).map((_, idx) => (
                <AppointmentCardSkeleton key={`skeleton-${idx}`} />
            ))}
        </div>
    );
};

export default AppointmentCards;
