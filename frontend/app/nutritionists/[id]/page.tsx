"use client";

import BodyLayout from "@/app/layouts/body-layout";
import NutritionistWithServiceCard from "@/components/card/nutritionit_with_service_card";
import AppointmentForm, { AppointmentFormHandle } from "@/components/forms/appointment_form";
import Modal from "@/components/modal";
import useAlert from "@/hooks/useAlert";
import { AppDispatch, RootState } from "@/store";
import { createAppointment } from "@/store/appointments_slice";
import { fetchNutritionistById } from "@/store/nutritionists_with_services_slice";
import { useEffect, use, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

type NutritionistPageProps = {
    params: Promise<{ id: string }>;
};

const NutritionistPage = ({ params }: NutritionistPageProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const unwrappedParams = use(params);
    const { id } = unwrappedParams;

    const { t } = useTranslation("errors_or_sucess");

    const modalRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<AppointmentFormHandle>(null);

    const [serviceId, setServiceId] = useState("");

    const openModal = () => modalRef.current?.showModal();
    const closeModal = () => modalRef.current?.close();

    const showAlert = useAlert();

    const selectedNutritionist = useSelector(
        (state: RootState) => state.nutritionists.selectedNutritionist,
    );

    useEffect(() => {
        dispatch({ type: "nutritionists/clearSelectedNutritionist" });
        dispatch(fetchNutritionistById(id));
    }, [dispatch, id]);

    const onClickScheduleAppointmentHandler = (nutricionId: string, serviceId: string) => {
        setServiceId(serviceId);
        openModal();
    };

    const handleAppointmentSubmit = async (data: {
        name: string;
        email: string;
        datetime: string;
    }) => {
        try {
            const resultAction = await dispatch(
                createAppointment({
                    appointment: {
                        guest_name: data.name,
                        guest_email: data.email,
                        date_time: data.datetime,
                        service_id: serviceId,
                    },
                    nutritionist_id: id,
                }),
            );

            closeModal();

            if (createAppointment.fulfilled.match(resultAction)) {
                formRef.current?.reset();

                showAlert("success", t("appointments.create-appoinment.sucess"));
            } else {
                showAlert("error", resultAction.payload ?? "Error creating an appointment");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
            showAlert("error", "Error creating an appointment.");
        }
    };

    return (
        <BodyLayout>
            {selectedNutritionist && (
                <NutritionistWithServiceCard
                    {...selectedNutritionist}
                    onClickScheduleAppointmentHandler={onClickScheduleAppointmentHandler}
                />
            )}

            <Modal ref={modalRef} title="Appointment" onClose={closeModal}>
                <AppointmentForm
                    ref={formRef}
                    onSubmit={handleAppointmentSubmit}
                    submitting={false}
                />
            </Modal>
        </BodyLayout>
    );
};

export default NutritionistPage;
