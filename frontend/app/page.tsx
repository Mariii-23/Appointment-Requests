"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNutritionists,
    makePageKeyNutritionists,
} from "@/store/nutritionists_with_services_slice";
import Paginator from "@/components/paginator";
import { NutritionistWithServices } from "@/types/nutritionist_with_service";
import { AppDispatch, RootState } from "@/store";
import NutritionistWithServicesCards from "@/components/cards/nutritionit_with_service_cards";
import NutritionistServiceSearch from "@/components/nutritionist_service_search";
import BannerLayout from "./layouts/banner-layout";
import BodyLayout from "./layouts/body-layout";
import Modal from "@/components/modal";
import { createAppointment } from "@/store/appointments_slice";
import AppointmentForm, { AppointmentFormHandle } from "@/components/forms/appointment_form";
import useAlert from "@/hooks/useAlert";
import { PATHS } from "@/constants/paths";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "@/utils/common";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();

    const modalRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<AppointmentFormHandle>(null);

    const { t } = useTranslation("common");

    const { t: t_error_sucess } = useTranslation("errors_or_sucess");

    const perPage = 2;

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [nutritionist, setNutritionist] = useState("");

    const router = useRouter();
    const showAlert = useAlert();

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

    const totalPages = useSelector(
        (state: RootState) => state.nutritionists.cache?.[pageKey]?.meta.total_pages ?? 0,
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

    const onClickWebsiteHandler = (nutritionistId: string) => {
        router.push(PATHS.NUTRITIONISTS_BY_ID(nutritionistId));
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

            closeModal();

            if (createAppointment.fulfilled.match(resultAction)) {
                formRef.current?.reset();

                showAlert("success", t_error_sucess("appointments.create-appoinment.sucess"));
            } else {
                showAlert("error", resultAction.payload ?? "Error creating an appointment");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
            showAlert("error", "Error creating an appointment.");
        }
    };

    return (
        <>
            <BannerLayout>
                <NutritionistServiceSearch onSearch={onSearch} />
            </BannerLayout>
            <BodyLayout>
                {loading && <div>{capitalizeFirstLetter(t("loading"))}...</div>}
                {error && (
                    <div className="text-red-600">
                        {capitalizeFirstLetter(t("error"))}: {error}
                    </div>
                )}

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
                                onNextPage={
                                    page == totalPages ? undefined : () => setPage(page + 1)
                                }
                                onPreviousPage={page == 1 ? undefined : () => setPage(page - 1)}
                            />
                        )}
                    </>
                )}

                <Modal
                    ref={modalRef}
                    title={capitalizeFirstLetter(t("appointment"))}
                    onClose={closeModal}
                >
                    <AppointmentForm
                        ref={formRef}
                        onSubmit={handleAppointmentSubmit}
                        submitting={false}
                    />
                </Modal>
            </BodyLayout>
        </>
    );
}
