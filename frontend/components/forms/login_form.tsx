"use client";

import FormLayout from "@/app/layouts/form-layout";
import { useEffect, useRef, useState } from "react";

type LoginFormProps = {
    onSubmit: (data: { email: string; password: string }) => void;
    submitting?: boolean;
    error?: string | null;
};

export default function LoginForm({ onSubmit, submitting, error }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formValid, setFormValid] = useState(false);

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
            title="Welcome back!!!"
            ref={formRef}
            onSubmit={e => {
                e.preventDefault();
                if (formValid) {
                    handleSubmit(e);
                }
            }}
        >
            <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Email</legend>
                <input
                    className="input validator w-full"
                    type="email"
                    required
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <div className="validator-hint">Enter valid email address</div>
            </fieldset>

            <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">Password</legend>
                <input
                    type="password"
                    className="input validator w-full"
                    required
                    placeholder="Password"
                    minLength={8}
                    title="Must be more than 8 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className="validator-hint">Must be more than 8 characters.</div>
            </fieldset>

            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={submitting || !formValid}
            >
                {submitting ? "Loading..." : "Login"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </FormLayout>
    );
}
