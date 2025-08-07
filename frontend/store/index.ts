import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import nutritionistsReducer from "./nutricionists_with_services_slice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        nutritionists: nutritionistsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
