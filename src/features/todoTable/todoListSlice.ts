import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {ITodo} from "@/app/types.ts";

const initialState: {data: ITodo[]} = {
    data: [],
}

export const todoListSlice = createSlice({
    name: "todoList",
    initialState,
    reducers: {
        updateTodoList: (state, payload: PayloadAction<ITodo[]>) => {
            state.data = payload.payload
        }
    }
})

export const todoListActions = todoListSlice.actions;
export const todoListReducer =  todoListSlice.reducer;