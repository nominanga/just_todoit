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
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useDeleteTodoByIdMutation, useUpdateTodoByIdMutation} from "@/app/todoApi.ts";
import {useNavigate} from "react-router-dom";

const Header = ["Status", "Title", "Created at"];

const TodoTablePage = () => {
    const {
        currentPage,
        goToPreviousPage,
        goToNextPage,
        isLoading,
        isFetching,
        isError,
        isLoadingTotal,
        totalPages,
        todos,
        goToPage,
        hasPreviousPage,
        hasNextPage
    }
        = useTodoPagination(1, 10);

    const [deleteTodo] =
        useDeleteTodoByIdMutation();
    const [updateTodo] =
        useUpdateTodoByIdMutation();

    const navigate = useNavigate();

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
            {isLoadingTotal && <Spinner/>}
            {(totalPages === 0) && !isLoadingTotal && <h1 className="text-2xl">No tasks created yet</h1>}
            {isError && <h1 className="text-2xl text-red">Server error</h1>}
            {totalPages > 0 &&
                <div className="overflow-hidden rounded-xl border shadow-xl w-full">
                    <Table className="table-fixed w-full">
                        <TableHeader>
                            <TableRow>
                                {Header.map((col) => (
                                    <TableHead  key={col}>{col}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {todos.map((todo) =>
                                <TableRow key={todo.id} onClick={() => {
                                    navigate(`todos/${todo.id}`)
                                }}>
                                    {(isLoading || isFetching) ?
                                        <Skeleton className="h-2 w-full m-5"/>
                                        :
                                        <>
                                            <TableCell className="flex gap-2 items-center">
                                                <Checkbox
                                                    id={`check${todo.id}`}
                                                    checked={todo.completed}
                                                    className="size-14px cursor-pointer "
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        updateTodo({id: Number(todo.id), body: {completed: !todo.completed}})
                                                    }}
                                                />
                                                <Label htmlFor={`todo${todo.id}`} className="mt-[3px]">Done</Label>
                                            </TableCell>
                                            <TableCell className=" lg:max-w-[200px] sm:max-w-[10px] truncate">{todo.title}</TableCell>
                                            <TableCell className=" lg:max-w-[200px] sm:max-w-[10px] truncate">
                                                {new Date(todo.createdAt * 1000).toLocaleString()}
                                            </TableCell>
                                            <TableCell className="flex justify-end items-center gap-3">
                                                <Button variant="outline">
                                                    <Pencil className="h-4 w-4"/>
                                                </Button>
                                                <Button
                                                    className="bg-red-800 hover:bg-red-900"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        deleteTodo(Number(todo.id))
                                                    }}>
                                                    <Trash2 className="h-4 w-4 color-white"/>
                                                </Button>
                                            </TableCell></>
                                    }
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            }
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