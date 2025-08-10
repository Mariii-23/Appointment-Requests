import { Appointment } from "@/types/appointment";
import React, { forwardRef } from "react";
import Modal from "../modal";
import DateTimeDisplay from "../date_time_display";
import Avatar from "../avatar";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "@/utils/common";

type Props = {
    appointment: Appointment;
    onAcceptAppoitment: (appointmentId: string) => void;
    onRejectAppointment: (appointmentId: string) => void;
    onCloseModal: () => void;
};

const RejectApproveAppointmentModal = forwardRef<HTMLDialogElement, Props>(
    ({ onCloseModal, appointment, onAcceptAppoitment, onRejectAppointment }, ref) => {
        const { t } = useTranslation("common");
        const { t: tModal } = useTranslation("components/modal/reject_appprove_appointment");

        const handleAccept = () => {
            onAcceptAppoitment(appointment.id);
        };

        const handleReject = () => {
            onRejectAppointment(appointment.id);
        };

        return (
            <Modal ref={ref} title={tModal("title")} onClose={onCloseModal}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        <div>
                            <Avatar size={64} name={appointment.guest_name} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>
                                <strong className="text-primary-green">
                                    {capitalizeFirstLetter(t("client"))}:
                                </strong>{" "}
                                {appointment.guest_name}
                            </p>
                            <p>
                                <strong className="text-primary-green">
                                    {capitalizeFirstLetter(t("email"))}:
                                </strong>{" "}
                                {appointment.guest_email}
                            </p>
                        </div>
                    </div>

                    <DateTimeDisplay dateTime={appointment.date_time} />
                </div>

                <div className="flex justify-end gap-4">
                    <button className="btn btn-outline" onClick={handleReject}>
                        {capitalizeFirstLetter(t("reject"))}
                    </button>
                    <button className="btn btn-primary" onClick={handleAccept}>
                        {capitalizeFirstLetter(t("accept"))}
                    </button>
                </div>
            </Modal>
        );
    },
);

RejectApproveAppointmentModal.displayName = "RejectApproveAppointmentModal";
export default RejectApproveAppointmentModal;
