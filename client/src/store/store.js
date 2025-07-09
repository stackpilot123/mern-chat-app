import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { notifyReducer } from "../features/auth/notifySlice";
import { sureReducer } from "../features/auth/sureSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notification: notifyReducer,
        sure: sureReducer
    }
})