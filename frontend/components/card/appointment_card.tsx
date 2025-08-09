"use client";

import React from "react";
import { formatDate } from "@/utils/date";
import { Appointment } from "@/types/appointment";
import Avatar from "../avatar";
import CalendarIcon from "../icons/calendar-icon";
import ClockIcon from "../icons/clock-icon";
import CardWithButtonLayout from "@/app/layouts/card-with-button-layout";

interface AppointmentCardProps extends Appointment {
  openModal: () => void;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ date_time,  guest_name, openModal }) => {
  const { day, monthYear, time } = formatDate(date_time);

  return (
    <CardWithButtonLayout onButtonClick={openModal} buttonText="Answer request" >
      <div className="flex flex-row gap-8">
        <div>
          <Avatar name={guest_name} />
        </div>

        <div className="flex flex-col gap-8">
            <div className="flex flex-col w-full gap-8">
              <div className="flex flex-col w-full gap-2">
                <h2 className="card-title">{guest_name}</h2>
                <p>Online appointment</p>
              </div>

              <div className="flex flex-col w-full gap-2">
                <div className="flex items-center gap-2">
                <CalendarIcon/>
                <p>{`${day} ${monthYear}`}</p>
                </div>
                <div className="flex items-center gap-2">
                <ClockIcon/>
                <p>{time}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </CardWithButtonLayout>
  );
};

export default AppointmentCard;
