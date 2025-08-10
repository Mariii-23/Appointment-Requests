"use client"

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import navbarEn from "@/app/locales/en/components/navbar.json";
import navbarPt from "@/app/locales/pt/components/navbar.json";

import commonEn from "@/app/locales/en/common.json";
import commonPt from "@/app/locales/pt/common.json";

import errorOrSucessEn from "@/app/locales/en/errors_or_sucess.json";
import errorOrSucessPt from "@/app/locales/pt/errors_or_sucess.json";

import servicesDisplayPt from "@/app/locales/pt/components/services_display.json";
import servicesDisplayEn from "@/app/locales/en/components/services_display.json";

import nutritionistServiceSearchPt from "@/app/locales/pt/components/nutritionist_service_search.json";
import nutritionistServiceSearchEn from "@/app/locales/en/components/nutritionist_service_search.json";

import appointmentCardPt from "@/app/locales/pt/components/appointment_card.json";
import appointmentCardEn from "@/app/locales/en/components/appointment_card.json";

//MODAL
import rejectApproveAppointmentModalPt from "@/app/locales/pt/components/reject_approve_appointment_modal.json";
import rejectApproveAppointmentModalEn from "@/app/locales/en/components/reject_approve_appointment_modal.json";

//FORMS
import loginPt from "@/app/locales/pt/components/form/login-form.json";
import loginEn from "@/app/locales/en/components/form/login-form.json";
import appointmentFormPt from "@/app/locales/pt/components/form/appointment-form.json";
import appointmentFormEn from "@/app/locales/en/components/form/appointment-form.json";

//Headers
import pendingApproveHeaderPt from "@/app/locales/pt/components/pending_appointment_header.json";
import pendingApproveHeaderEn from "@/app/locales/en/components/pending_appointment_header.json";

const resources = {
    en: {
        "common": commonEn,

        "errors_or_sucess": errorOrSucessEn,

        "components/navbar": navbarEn,
        "components/services_display": servicesDisplayEn,
        "components/nutritionist_service_search": nutritionistServiceSearchEn,

        "components/modal/reject_appprove_appointment": rejectApproveAppointmentModalEn,

        "components/form/login": loginEn,
        "components/form/appointment": appointmentFormEn,

        "componets/card/appointment-card": appointmentCardEn,

        "components/header/pending_appointment": pendingApproveHeaderEn
    },
    pt: {
        "common": commonPt,

        "errors_or_sucess": errorOrSucessPt,

        "components/navbar": navbarPt,
        "components/services_display": servicesDisplayPt,
        "components/nutritionist_service_search": nutritionistServiceSearchPt,

        "components/modal/reject_appprove_appointment": rejectApproveAppointmentModalPt,

        "components/form/login": loginPt,
        "components/form/appointment": appointmentFormPt,

        "componets/card/appointment-card": appointmentCardPt,

        "components/header/pending_appointment": pendingApproveHeaderPt
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "pt",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        ns: ["components"],
        defaultNS: "components",
    });

export default i18n;