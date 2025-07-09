import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser: (state,action) =>{
            state.userInfo = action.payload;
        }
    }
})

export const{setUser} = authSlice.actions;

export const authReducer = authSlice.reducer;