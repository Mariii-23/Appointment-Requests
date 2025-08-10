import React from "react";
import CalendarIcon from "@/components/icons/calendar-icon";
import ClockIcon from "@/components/icons/clock-icon";
import { formatDate } from "@/utils/date";

interface DateTimeDisplayProps {
    dateTime: string;
}

const DateTimeDisplay = ({ dateTime }: DateTimeDisplayProps) => {
    const { day, monthYear, time } = formatDate(dateTime);

    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-2 w-auto">
                <div className="flex items-center gap-2">
                    <CalendarIcon />
                    <p>{`${day} ${monthYear}`}</p>
                </div>
                <div className="flex items-center gap-2">
                    <ClockIcon />
                    <p>{time}</p>
                </div>
            </div>
        </div>
    );
};

export default DateTimeDisplay;
