import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notify: {
        message: "",
        type: ""
    }
}

export const notifySlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotif: (state, action) => {
            state.notify = { message: action.payload.message, type: action.payload.type }
        }
    }
})

export const { setNotif } = notifySlice.actions;

export const notifyReducer = notifySlice.reducer;
