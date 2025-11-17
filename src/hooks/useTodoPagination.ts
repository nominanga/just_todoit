import {useMemo, useState} from "react";
import {useGetAllTodosQuery, useGetTodosPageQuery} from "@/app/todoApi.ts";
import type {PaginationReturn} from "@/app/types.ts";

export function useTodoPagination(
    initialPage: number,
    limit: number
): PaginationReturn {
    const [currentPage, setCurrentPage] = useState(initialPage)

    const {
        data: allTodos,
        isLoading: isLoadingTotal,
        isError: isErrorTotal,
    } = useGetAllTodosQuery(undefined, {
        refetchOnMountOrArgChange: false,
    });

    const paginationMeta = useMemo(() => {
        const totalCount = allTodos?.length ?? 0;
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = currentPage < totalPages;
        const hasPreviousPage = currentPage > 1;

        return {
            totalCount,
            totalPages,
            hasNextPage,
            hasPreviousPage,
        };
    }, [allTodos?.length, currentPage, limit]);

    const goToPreviousPage = () => {
        if (paginationMeta.hasPreviousPage) {
            setCurrentPage(currentPage - 1)
        }
    }

    const goToNextPage = () => {
        if (paginationMeta.hasNextPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const goToPage = (page: number) => {
        if (page >= 1 && page <= paginationMeta.totalPages) {
            setCurrentPage(page)
        }
    }

    const {
        data: todos,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetTodosPageQuery({
        page: currentPage,
        limit,
    });

    return {
        ...paginationMeta,
        currentPage,
        goToNextPage,
        goToPreviousPage,
        goToPage,
        isLoading,
        isLoadingTotal,
        isFetching,
        error,
        isError: isError || isErrorTotal,
        todos: todos ?? []
    }
}