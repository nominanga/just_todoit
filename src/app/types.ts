import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";

export interface ITodo {
    id: string;
    title: string;
    completed: boolean;
    description: string;
    createdAt: number;
}

export interface PaginationReturn {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    isLoading: boolean;
    isLoadingTotal: boolean;
    isError: boolean;
    isFetching: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    goToPage: (page: number) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    todos: ITodo[];
}

export interface AuthCredentials {
    username: string;
    password: string;
}

export interface AuthState {
    isAuthenticated: boolean;
}