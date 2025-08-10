"use client";

import FormLayout from "@/app/layouts/form-layout";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type LoginFormProps = {
    onSubmit: (data: { email: string; password: string }) => void;
    submitting?: boolean;
    error?: string | null;
};

export default function LoginForm({ onSubmit, submitting, error }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formValid, setFormValid] = useState(false);

    const { t } = useTranslation("components/form/login");

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formRef.current) {
            setFormValid(formRef.current.checkValidity());
        }
    }, [email, password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({ email, password });

        setEmail("");
        setPassword("");
    };

    return (
        <FormLayout
            title={t("title")}
            ref={formRef}
            onSubmit={e => {
                e.preventDefault();
                if (formValid) {
                    handleSubmit(e);
                }
            }}
        >
            <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">{t("email")}</legend>
                <input
                    className="input validator w-full"
                    type="email"
                    required
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <div className="validator-hint">{t("email-validator")}</div>
            </fieldset>

            <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">{t("password")}</legend>
                <input
                    type="password"
                    className="input validator w-full"
                    required
                    placeholder="Password"
                    minLength={8}
                    title={t("password-validator")}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className="validator-hint">{t("password-validator")}</div>
            </fieldset>

            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={submitting || !formValid}
            >
                {submitting ? t("submit-button-loading") : t("submit-button")}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </FormLayout>
    );
}
