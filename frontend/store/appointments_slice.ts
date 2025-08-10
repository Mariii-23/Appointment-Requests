import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { MetaData } from "@/types/meta_data";
import { State } from "@/types/state_store";
import {
    Appointment,
    AppointmentStatus,
    CreateAppointmentParams,
    FetchAppointmentsParams,
} from "@/types/appointment";

type AppointmentsState = State<Appointment[]>;

const initialState: AppointmentsState = {
    cache: {},
    loading: false,
    error: null,
};

function makePageKeyAppointments(params: FetchAppointmentsParams) {
    return `page=${params.page}&per_page=${params.per_page}`;
}

export const fetchAllAppointments = createAsyncThunk<
    { data: Appointment[]; meta: MetaData; pageKey: string },
    FetchAppointmentsParams,
    { rejectValue: string }
>("appointments/fetchAll", async (params, thunkAPI) => {
    const pageKey = makePageKeyAppointments(params);
    const state = thunkAPI.getState() as { appointments: AppointmentsState };
    const cachedPage = state.appointments.cache[pageKey];

    if (cachedPage) {
        return {
            data: cachedPage.data,
            meta: cachedPage.meta,
            pageKey,
        };
    }

    try {
        const res = await api.get("/appointments", {
            params: {
                page: params.page,
                per_page: params.per_page,
                status: params.status,
            },
        });

        if (res.data.isSuccess) {
            const result = res.data.result;
            return {
                data: result.data,
                meta: {
                    current_page: result.current_page,
                    per_page: result.per_page,
                    total_count: result.total_count,
                    total_pages: result.total_pages,
                },
                pageKey,
            };
        } else {
            return thunkAPI.rejectWithValue("Failed to fetch appointments");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("Unknown error occurred");
    }
});

export const createAppointment = createAsyncThunk<
    Appointment,
    CreateAppointmentParams,
    { rejectValue: string }
>("appointments/create", async (params, thunkAPI) => {
    try {
        const res = await api.post("/appointments", { ...params });

        if (res.data.isSuccess) {
            return res.data.result;
        } else {
            return thunkAPI.rejectWithValue("Failed to create appointment");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("Unknown error occurred");
    }
});

export const updateAppointmentStatus = createAsyncThunk<
    Appointment,
    { appointmentId: string; status: AppointmentStatus },
    { rejectValue: string }
>("appointments/updateStatus", async ({ appointmentId, status }, thunkAPI) => {
    try {
        const res = await api.patch(`/appointments/${appointmentId}/update_status`, {
            status,
        });

        if (res.data.isSuccess) {
            return res.data.result;
        } else {
            return thunkAPI.rejectWithValue("Failed to update appointment status");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("Unknown error occurred");
    }
});

const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        resetCache(state) {
            state.cache = {};
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllAppointments.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllAppointments.fulfilled, (state, action) => {
                state.loading = false;
                const { pageKey, data, meta } = action.payload;
                state.cache[pageKey] = { data, meta };
            })
            .addCase(fetchAllAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to load appointments";
            })

            .addCase(createAppointment.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAppointment.fulfilled, state => {
                state.loading = false;
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to create appointment";
            })
            .addCase(updateAppointmentStatus.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedAppointment = action.payload;

                Object.values(state.cache).forEach(pageData => {
                    pageData.data = pageData.data.filter(a => a.id !== updatedAppointment.id);
                });
            })
            .addCase(updateAppointmentStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to update appointment status";
            });
    },
});

export const { resetCache } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
export { makePageKeyAppointments };
