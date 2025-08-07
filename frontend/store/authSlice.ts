import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../services/api";
import { AuthState, LoginResponse, LoginPayload } from "@/types/auth";

const initialState: AuthState = {
    token: null,
    nutritionist: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk<
    LoginResponse,
    LoginPayload,
    { rejectValue: string }
>("auth/login", async (payload, thunkAPI) => {
    try {
        const response = await api.post("/login", payload);
        if (response.data.isSuccess && response.data.result) {
            return response.data.result as LoginResponse;
        }
        return thunkAPI.rejectWithValue("Login failed");
    } catch (error: unknown) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("Unknown error occurred");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.nutritionist = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.token = action.payload.token;
                state.nutritionist = action.payload.nutritionist;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to login";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
