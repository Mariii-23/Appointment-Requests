"use client";

import React, { useTransition } from "react";
import { Appointment } from "@/types/appointment";
import Avatar from "../avatar";
import CardWithButtonLayout from "@/app/layouts/card-with-button-layout";
import DateTimeDisplay from "../date_time_display";
import { useTranslation } from "react-i18next";

interface AppointmentCardProps extends Appointment {
    onAnswerRequestAppointmentClick: (appointment: Appointment) => void;
}

const AppointmentCard = ({
    date_time,
    guest_name,
    guest_email,
    onAnswerRequestAppointmentClick,
    ...appointmentProps
}: AppointmentCardProps) => {
    const appointment = { date_time, guest_name, guest_email, ...appointmentProps };

    const { t } = useTranslation("componets/card/appointment-card");

    return (
        <CardWithButtonLayout
            onButtonClick={() => onAnswerRequestAppointmentClick(appointment)}
            buttonText={t("answer-request")}
        >
            <div className="flex flex-row gap-8">
                <div>
                    <Avatar name={guest_name} />
                </div>

                <div className="flex flex-col w-full gap-2">
                    <h2 className="card-title">{guest_name}</h2>
                    <h2>{guest_email}</h2>
                </div>
            </div>

            <div className="flex items-center justify-center w-full">
                <DateTimeDisplay dateTime={appointment.date_time} />
            </div>
        </CardWithButtonLayout>
    );
};

export default AppointmentCard;
