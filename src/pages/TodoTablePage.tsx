import {useTodoPagination} from "@/hooks/useTodoPagination.ts";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem, PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";


const TodoTablePage = () => {

    const {
        currentPage,
        goToPreviousPage,
        goToNextPage,
        isError,
        isLoading,
        isFetching,
        isLoadingTotal,
        totalPages,
        todos,
        goToPage,
        hasPreviousPage,
        hasNextPage
    }
        = useTodoPagination(1, 10);


    const listAvailablePages = () => {
        if (totalPages < 3) {
            return [...Array(totalPages).keys()].map(i => i + 1);
        }
        if (currentPage === 1) {
            return [currentPage, currentPage + 1, currentPage + 2];
        }
        if (currentPage === totalPages) {
            return [currentPage - 2, currentPage - 1, currentPage];
        }
        return [currentPage - 1, currentPage, currentPage + 1];
    }

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
                    {hasPreviousPage && (
                        <PaginationItem>
                            <PaginationPrevious action={() => goToPreviousPage()}/>
                        </PaginationItem>
                    )}
                    {listAvailablePages()[0] > 1 && (
                        <PaginationItem>
                            <PaginationEllipsis/>
                        </PaginationItem>
                    )}
                    {listAvailablePages().map((page) => (
                        <PaginationItem>
                            <PaginationLink isActive={page === currentPage} action={() => goToPage(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {listAvailablePages()[2] < totalPages && (
                        <PaginationItem>
                            <PaginationEllipsis/>
                        </PaginationItem>
                    )}
                    {hasNextPage && (
                        <PaginationItem>
                            <PaginationNext action={() => goToNextPage()}/>
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default TodoTablePage;