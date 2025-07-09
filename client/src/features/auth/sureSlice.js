import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sure:{
        isConfirm: null,
        isShow: false
    }
}

export const sureSlice = createSlice({
    name: "sure",
    initialState,
    reducers:{
        setIsShow: (state,action)=>{
            state.sure = {...state.sure, isShow: action.payload}
        },
        setIsConfirm: (state,action) =>{
            state.sure = {...state.sure, isConfirm: action.payload}
        }
    }
});

export const {setIsConfirm, setIsShow} = sureSlice.actions;

export const sureReducer = sureSlice.reducer;