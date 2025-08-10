"use client";

import React from "react";
import { Appointment } from "@/types/appointment";
import Avatar from "../avatar";
import CardWithButtonLayout from "@/app/layouts/card-with-button-layout";
import DateTimeDisplay from "../date_time_display";

interface AppointmentCardProps extends Appointment {
    onAnswerRequestAppointmentClick: (appointment: Appointment) => void;
}

const AppointmentCard = ({
    date_time,
    guest_name,
    onAnswerRequestAppointmentClick,
    ...appointmentProps
}: AppointmentCardProps) => {
    const appointment = { date_time, guest_name, ...appointmentProps };

    return (
        <CardWithButtonLayout
            onButtonClick={() => onAnswerRequestAppointmentClick(appointment)}
            buttonText="Answer request"
        >
            <div className="flex flex-row gap-8">
                <div>
                    <Avatar name={guest_name} />
                </div>

                <div className="flex flex-col w-full gap-2">
                    <h2 className="card-title">{guest_name}</h2>
                    <p>Online appointment</p>
                </div>
            </div>

            <div className="flex items-center justify-center w-full">
                <DateTimeDisplay dateTime={appointment.date_time} />
            </div>
        </CardWithButtonLayout>
    );
};

export default AppointmentCard;
