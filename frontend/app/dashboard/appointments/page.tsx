"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Modal from "@/components/modal";
import PrivateRoute from "@/app/layouts/private-page-layout";
import BodyLayout from "@/app/layouts/body-layout";
import { fetchAllAppointments, makePageKeyAppointments } from "@/store/appointments_slice";
import AppointmentCards from "@/components/cards/appointment_cards";

export default function NutritionistAppointmentsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const modalRef = useRef<HTMLDialogElement>(null);
  const openModal = () => modalRef.current?.showModal();
  const closeModal = () => modalRef.current?.close();

  const perPage = 5;

  const [page, setPage] = useState(1);
  const [pageKey, setPageKey] = useState(
      makePageKeyAppointments({
          page,
          per_page: perPage,
      }),
  );

  const appointmentsData = useSelector(
    (state: RootState) => state.appointments.cache?.[pageKey] ?? null
  );
  const loading = useSelector((state: RootState) => state.appointments.loading);
  const error = useSelector((state: RootState) => state.appointments.error);

  useEffect(() => {
    setPageKey(makePageKeyAppointments({ page, per_page: perPage }))
    dispatch(fetchAllAppointments({ page, per_page: perPage }));
  }, [dispatch, page, perPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <PrivateRoute>
    <BodyLayout>
      <h1>Pending Requests</h1>
      <h6>Accept or reject new pending request</h6>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">Error: {error}</div>}

      {appointmentsData && (
        <AppointmentCards appointments={appointmentsData.data}/>
      )}

      <Modal ref={modalRef} title="Accept or Reject" onClose={closeModal}>
        <div>Answer</div>
      </Modal>
    </BodyLayout>
  </PrivateRoute>
  );
}