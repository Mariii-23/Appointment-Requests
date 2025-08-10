"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import PrivateRoute from "@/app/layouts/private-page-layout";
import BodyLayout from "@/app/layouts/body-layout";
import {
    fetchAllAppointments,
    makePageKeyAppointments,
    updateAppointmentStatus,
} from "@/store/appointments_slice";
import AppointmentCards from "@/components/cards/appointment_cards";
import CardLayout from "@/app/layouts/card-layout";
import { Appointment, AppointmentStatus } from "@/types/appointment";
import RejectApproveAppointmentModal from "@/components/modal/RejectApproveAppointmentModal";
import AppointmentsHeader from "@/components/headers/PendingAppointmentsHeader";

export default function NutritionistAppointmentsPage() {
    const perPage = 6;
    const initialAppointment = {
        id: "",
        guest_name: "",
        guest_email: "",
        service_id: "",
        status: AppointmentStatus.Pending,
        date_time: "",
    };

    const dispatch = useDispatch<AppDispatch>();
    const modalRef = useRef<HTMLDialogElement>(null);
    const openModal = () => modalRef.current?.showModal();
    const closeModal = () => modalRef.current?.close();
    const [appointmentSelected, setAppointmentSelected] = useState<Appointment>(initialAppointment);

    const [page, setPage] = useState(1);
    const [pageKey, setPageKey] = useState(
        makePageKeyAppointments({
            page,
            per_page: perPage,
        }),
    );

    const totalPages = useSelector(
        (state: RootState) => state.appointments.cache?.[pageKey]?.meta.total_pages ?? 0,
    );

    const appointmentsData = useSelector(
        (state: RootState) => state.appointments.cache?.[pageKey] ?? null,
    );
    const loading = useSelector((state: RootState) => state.appointments.loading);
    const error = useSelector((state: RootState) => state.appointments.error);

    useEffect(() => {
        setPageKey(makePageKeyAppointments({ page, per_page: perPage }));
        dispatch(
            fetchAllAppointments({ page, per_page: perPage, status: AppointmentStatus.Pending }),
        );
    }, [dispatch, page, perPage]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const onRefresh = () => {
        //TODO: voltar a fazer o pedido
    };

    const previousPage = () => {
        if (page > 1) {
            handlePageChange(page - 1);
        }
    };

    const nextPage = () => {
        handlePageChange(page + 1);
    };

    const onAnswerRequestAppointmentClick = (appointment: Appointment) => {
        setAppointmentSelected(appointment);

        if (appointmentSelected) {
            openModal();
        }
    };

    const handleAcceptAppointment = (appointmentId: string) => {
        dispatch(updateAppointmentStatus({ appointmentId, status: AppointmentStatus.Accepted }))
            .unwrap()
            .then(() => {
                closeModal();
                setAppointmentSelected(initialAppointment);
            })
            .catch(err => {
                console.error("Failed to accept appointment:", err);
                //TODO: Mostrar erro pro user
            });
    };

    const handleRejectAppointment = (appointmentId: string) => {
        dispatch(updateAppointmentStatus({ appointmentId, status: AppointmentStatus.Rejected }))
            .unwrap()
            .then(() => {
                closeModal();
                setAppointmentSelected(initialAppointment);
            })
            .catch(err => {
                console.error("Failed to reject appointment:", err);
                //TODO: Mostrar erro pro user
            });
    };

    return (
        <PrivateRoute>
            <BodyLayout>
                <CardLayout>
                    <AppointmentsHeader
                        onPreviousPage={previousPage}
                        onNextPage={nextPage}
                        onRefresh={onRefresh}
                        disableNextPage={page == totalPages}
                        disablePreviosPage={page == 1}
                    />

                    {loading && <div>Loading...</div>}
                    {error && <div className="text-red-600">Error: {error}</div>}

                    {appointmentsData && (
                        <AppointmentCards
                            appointments={appointmentsData.data}
                            onAnswerRequestAppointmentClick={onAnswerRequestAppointmentClick}
                        />
                    )}

                    <RejectApproveAppointmentModal
                        ref={modalRef}
                        onCloseModal={closeModal}
                        onAcceptAppoitment={handleAcceptAppointment}
                        onRejectAppointment={handleRejectAppointment}
                        appointment={appointmentSelected}
                    />
                </CardLayout>
            </BodyLayout>
        </PrivateRoute>
    );
}
