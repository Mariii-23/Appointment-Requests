import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import nutritionistsReducer from "./nutritionists_with_services_slice";
import appointmentsReducer from "./appointments_slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        nutritionists: nutritionistsReducer,
        appointments: appointmentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
