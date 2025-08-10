"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import FormLayout from "@/app/layouts/form-layout";

type AppointmentFormProps = {
    onSubmit: (data: { name: string; email: string; datetime: string }) => void;
    submitting?: boolean;
};

export type AppointmentFormHandle = {
    reset: () => void;
};

const AppointmentForm = forwardRef<AppointmentFormHandle, AppointmentFormProps>(
    ({ onSubmit, submitting }, ref) => {
        const { t } = useTranslation("components/form/appointment");

        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [datetime, setDatetime] = useState("");
        const [formValid, setFormValid] = useState(false);

        const formRef = useRef<HTMLFormElement>(null);

        useEffect(() => {
            if (formRef.current) {
                setFormValid(formRef.current.checkValidity());
            }
        }, [name, email, datetime]);

        useImperativeHandle(ref, () => ({
            reset() {
                setName("");
                setEmail("");
                setDatetime("");
            },
        }));

        return (
            <FormLayout
                ref={formRef}
                onSubmit={e => {
                    e.preventDefault();
                    if (formValid) {
                        onSubmit({ name, email, datetime });
                    }
                }}
                className="w-full max-w-md mx-auto space-y-6 p-4"
            >
                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("guestName")}</legend>
                    <input
                        className="input validator w-full"
                        type="text"
                        required
                        placeholder={t("guestNamePlaceholder")}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <div className="validator-hint">{t("guestNameHint")}</div>
                </fieldset>

                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("email")}</legend>
                    <input
                        className="input validator w-full"
                        type="email"
                        required
                        placeholder={t("emailPlaceholder")}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className="validator-hint">{t("emailHint")}</div>
                </fieldset>

                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">{t("appointmentDateTime")}</legend>
                    <input
                        className="input validator w-full"
                        type="datetime-local"
                        required
                        value={datetime}
                        onChange={e => setDatetime(e.target.value)}
                    />
                    <div className="validator-hint">{t("appointmentDateTimeHint")}</div>
                </fieldset>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={submitting || !formValid}
                >
                    {submitting ? t("submit.booking") : t("submit.book")}
                </button>
            </FormLayout>
        );
    },
);

AppointmentForm.displayName = "AppointmentForm";

export default AppointmentForm;
