import {createSlice} from '@reduxjs/toolkit';
import type {AuthState} from "@/app/types.ts";

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === 'true'
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state: AuthState) => {
            state.isAuthenticated = true;
            localStorage.setItem("isAuthenticated", "true")
        },
        logout: (state: AuthState) => {
            state.isAuthenticated = false;
            localStorage.removeItem("isAuthenticated");
        }
    }
})

export const loginActions = loginSlice.actions;
export const loginReducer =  loginSlice.reducer;