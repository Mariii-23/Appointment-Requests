import FormLayout from "@/app/layouts/form-layout";
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

type AppointmentFormProps = {
    onSubmit: (data: { name: string; email: string; datetime: string }) => void;
    submitting?: boolean;
};

export type AppointmentFormHandle = {
    reset: () => void;
};

const AppointmentForm = forwardRef<AppointmentFormHandle, AppointmentFormProps>(
    ({ onSubmit, submitting }, ref) => {
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
                    <legend className="fieldset-legend">Guest Name</legend>
                    <input
                        className="input validator w-full"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <div className="validator-hint">Please enter your full name.</div>
                </fieldset>

                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Email</legend>
                    <input
                        className="input validator w-full"
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className="validator-hint">Enter a valid email address.</div>
                </fieldset>

                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Appointment Date & Time</legend>
                    <input
                        className="input validator w-full"
                        type="datetime-local"
                        required
                        value={datetime}
                        onChange={e => setDatetime(e.target.value)}
                    />
                    <div className="validator-hint">Pick your preferred date and time.</div>
                </fieldset>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={submitting || !formValid}
                >
                    {submitting ? "Booking..." : "Book Appointment"}
                </button>
            </FormLayout>
        );
    },
);

AppointmentForm.displayName = "AppointmentForm";

export default AppointmentForm;
