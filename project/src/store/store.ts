import { configureStore } from "@reduxjs/toolkit";
import companyReducer from './companySlice';
import { RootStore } from "../types/types";

export const store = configureStore({
    reducer: {
        [RootStore.COMPANY]: companyReducer
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
