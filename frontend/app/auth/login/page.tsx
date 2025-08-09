"use client";

import { AppDispatch, RootState } from "@/store";
import { login } from "@/store/authSlice";
import { PATHS } from "@/constants/paths";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/forms/login_form";

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);

    const handleLogin = async (data: { email: string; password: string }) => {
        const resultAction = await dispatch(login(data));

        if (login.fulfilled.match(resultAction)) {
            router.push(PATHS.NUTRICIONISTS_DASHBOARD);
        }
    };

    return (
        <LoginForm onSubmit={handleLogin} submitting={authState.loading} error={authState.error} />
    );
}
