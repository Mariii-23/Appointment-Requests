import { Nutritionist } from "./nutritionist";

export interface AuthState {
    token: string | null;
    nutritionist: Nutritionist | null;
    loading: boolean;
    error: string | null;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    nutritionist: Nutritionist;
}
