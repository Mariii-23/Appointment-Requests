"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNutritionists,
    makePageKeyNutritionists,
} from "@/store/nutricionists_with_services_slice";
import Paginator from "@/components/paginator";
import { NutritionistWithServices } from "@/types/nutritionist_with_service";
import { AppDispatch, RootState } from "@/store";
import NutritionistWithServicesCards from "@/components/cards/nutritionit_with_service_cards";
import NutritionistServiceSearch from "@/components/nutritionist_service_search";
import BannerLayout from "./layouts/banner-layout";
import BodyLayout from "./layouts/body-layout";
import Modal from "@/components/modal";
import AppointmentForm from "@/components/forms/appointment_form";
import { createAppointment } from "@/store/appointments_slice";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const modalRef = useRef<HTMLDialogElement>(null);

    const perPage = 2;

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [nutritionist, setNutritionist] = useState("");

    const openModal = () => modalRef.current?.showModal();
    const closeModal = () => modalRef.current?.close();

    const [pageKey, setPageKey] = useState(
        makePageKeyNutritionists({
            nutritionistOrServiceName: search,
            location,
            page,
            per_page: perPage,
        }),
    );

    useEffect(() => {
        setPageKey(
            makePageKeyNutritionists({
                nutritionistOrServiceName: search,
                location,
                page,
                per_page: perPage,
            }),
        );
    }, [search, location, page]);

    const currentPageData = useSelector(
        (state: RootState) => state.nutritionists.cache?.[pageKey] ?? null,
    );

    const loading = useSelector((state: RootState) => state.nutritionists.loading);
    const error = useSelector((state: RootState) => state.nutritionists.error);

    useEffect(() => {
        dispatch(
            fetchNutritionists({
                nutritionistOrServiceName: search,
                location,
                page,
                per_page: perPage,
            }),
        );
    }, [dispatch, pageKey, search, location, page, perPage]);

    const onSearch = (newSearch: string, newLocation: string) => {
        setSearch(newSearch);
        setLocation(newLocation);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const onClickScheduleAppointmentHandler = (nutricionId: string, serviceId: string) => {
        setServiceId(serviceId);
        setNutritionist(nutricionId);
        openModal();
    };

    const onClickWebsiteHandler = (nutricionId: string) => {
        //TODO:
        console.log("Website: ", nutricionId);
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
                    nutritionist_id: nutritionist,
                }),
            );

            if (createAppointment.fulfilled.match(resultAction)) {
                //TODO: Alertar o sucesso
                console.log("Agendamento criado com sucesso!");
                closeModal();
            } else {
                //TODO: Alertar o erro
                console.error("Falha ao criar agendamento:", resultAction.payload);
            }
        } catch (error) {
            //TODO: Alertar o erro
            console.error("Error:", error);
        }
    };

    return (
        <>
            <BannerLayout>
                <NutritionistServiceSearch onSearch={onSearch} />
            </BannerLayout>
            <BodyLayout>
                {loading && <div>Loading...</div>}
                {error && <div className="text-red-600">Error: {error}</div>}

                {currentPageData && (
                    <>
                        <NutritionistWithServicesCards
                            nutritionists={currentPageData.data as NutritionistWithServices[]}
                            onClickScheduleAppointmentHandler={onClickScheduleAppointmentHandler}
                            onClickWebsiteHandler={onClickWebsiteHandler}
                        />

                        {currentPageData.meta.total_pages > 1 && (
                            <Paginator
                                totalPages={currentPageData.meta.total_pages}
                                currentPage={page}
                                onClickPage={handlePageChange}
                            />
                        )}
                    </>
                )}

                <Modal ref={modalRef} title="Appointment" onClose={closeModal}>
                    <AppointmentForm onSubmit={handleAppointmentSubmit} submitting={false} />
                </Modal>
            </BodyLayout>
        </>
    );
}
