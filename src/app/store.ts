import {configureStore} from "@reduxjs/toolkit";
import {todoApi} from "@/app/todoApi.ts";
import {setupListeners} from "@reduxjs/toolkit/query";
import {loginReducer} from "@/features/auth/loginSlice.ts";
import {todoListReducer} from "@/features/todoTable/todoListSlice.ts";


export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
        login: loginReducer,
        todoList: todoListReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoApi.middleware),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
