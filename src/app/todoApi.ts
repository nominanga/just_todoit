import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {createApi} from "@reduxjs/toolkit/query/react";
import type {ITodo} from "@/app/types.ts";

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://691a9bb52d8d7855756f66f9.mockapi.io/api//"}),
    tagTypes: ["Todo"],
    endpoints: (build) => ({
        getTodoById: build.query<ITodo, number>({
            query: (id: number) => ({
                url: `todos/${id}`
            }),
        }),
        deleteTodoById: build.mutation<ITodo, number>({
            query: (id) => ({
                url: `todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todo"],
        }),
        updateTodoById: build.mutation<ITodo, { id: number; body: Partial<ITodo> }>({
            query: ({ id, body }) => ({
                url: `todos/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Todo"],
        }),
        createTodo: build.mutation<ITodo, Partial<ITodo>>({
            query: (body) => ({
                url: "todos",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Todo"],
        }),
        getTodosPage: build.query<ITodo[], {page: number, limit: number}>({
            query: ({page, limit}) => ({
                url: "todos",
                params: {limit, page}
            }),
            providesTags: ["Todo"],
        }),
        getAllTodos: build.query<ITodo[], void>({
            query: () => "todos",
            providesTags: ["Todo"],
        }),
    }),
})

export const {
    useGetAllTodosQuery,
    useGetTodosPageQuery,
} = todoApi;