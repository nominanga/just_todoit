import {useTodoPagination} from "@/hooks/useTodoPagination.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem, PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Trash2} from "lucide-react";

const Header = ["Status", "Title", "Created at"];

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
                    <TableHeader>
                        <TableRow>
                            {Header.map((col) => (
                                <TableHead  key={col}>{col}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {todos.map((todo) =>
                            <TableRow key={todo.id}>
                                <TableCell className="flex gap-2 items-center h-16">
                                    <Checkbox id={`check${todo.id}`} defaultChecked={!todo.completed}/>
                                    <Label htmlFor={`todo${todo.id}`}>Done</Label>
                                </TableCell>
                                <TableCell className="h-16">{todo.title}</TableCell>
                                <TableCell className="h-16">{new Date(todo.createdAt).toLocaleString()}</TableCell>
                                <TableCell className="flex justify-end items-center gap-3">
                                    <Button variant="outline">
                                        <Pencil className="h-4 w-4"/>
                                    </Button>
                                    <Button className="bg-red-800 hover:bg-red-900">
                                        <Trash2 className="h-4 w-4 color-white"/>
                                    </Button>
                                </TableCell>
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
                        <PaginationItem key={page}>
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