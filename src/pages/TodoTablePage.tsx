import {useTodoPagination} from "@/hooks/useTodoPagination.ts";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem, PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {useEffect, useState} from "react";


const TodoTablePage = () => {

    const {
        currentPage,
        goToPreviousPage,
        goToNextPage,
        isError,
        isLoading,
        isFetching,
        totalPages,
        todos,
        goToPage,
        hasPreviousPage,
        hasNextPage
    }
        = useTodoPagination(1, 10);

    const [pagesList, setPagesList] = useState<number[]>([...Array.from({length: totalPages}, (_, i) => i + 1)]);

    const [availablePages, setAvailablePages] = useState<number[]>((pagesList.length < 3) ? pagesList : pagesList.slice(0, 3));

    useEffect(() => {

    }, [currentPage])

    return (
        <div className="flex flex-col items-center gap-4 h-full justify-between">
            <h1 className="text-3xl font-semibold underline underline-offset-4">All Todos</h1>
            <div className="overflow-x-hidden rounded-xl border shadow-xl w-full">
                <Table>
                    <TableBody>
                        {todos.map((todo) =>
                            <TableRow key={todo.id}>
                                <TableCell className="h-16">{todo.id}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious action={() => goToPreviousPage()}/>
                    </PaginationItem>
                    {currentPage > 2 &&
                        (
                            <PaginationItem>
                                <PaginationEllipsis/>
                            </PaginationItem>
                        )
                    }
                    {availablePages.map((page) => (
                        <PaginationItem>
                            <PaginationLink isActive={page === currentPage} action={() => goToPage(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {currentPage >= totalPages - 1 &&
                        (
                            <PaginationItem>
                                <PaginationEllipsis/>
                            </PaginationItem>
                        )
                    }
                    <PaginationItem>
                        <PaginationNext action={() => goToNextPage()}/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default TodoTablePage;