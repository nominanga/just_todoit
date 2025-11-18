import {Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@radix-ui/react-label";
import {useCreateTodoMutation} from "@/app/todoApi.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {ITodo} from "@/app/types.ts";
import {useCallback, useEffect, useRef} from "react";
import {toast} from "sonner";

const TodoForm = () => {

    const navigate = useNavigate();
    const [create, {isSuccess, isLoading}] = useCreateTodoMutation();
    const toastIdRef = useRef<string | number | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<ITodo>({
        defaultValues: {
            title: "",
            description: ""
        }
    });

    const submit = useCallback<SubmitHandler<ITodo>>((data) => {
        data.completed = false;
        data.createdAt = Date.now();

        create(data);
    }, [create]);

    useEffect(() => {
        if (isLoading) {
            toastIdRef.current = toast.loading("Creating...");
        }
        if (!isLoading && isSuccess) {
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current);
            }
            toast.success("Todo is created");
            setTimeout(() => navigate("/"), 1000);
        }
    }, [isLoading, isSuccess, navigate]);


    return (
        <div className="todo-form-container">
            <Card>
                <CardHeader>
                    <CardTitle>Create new todo</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(submit)} className="grid gap-5" id="create-form">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                {...register("title", {
                                    required: "Title is required",
                                    maxLength: {value: 30, message: "Title length must be under 30 symbols"}
                                })}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">{errors.title.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                {...register("description", {
                                    required: "Description is required",
                                    maxLength: {value: 100, message: "Description length must be under 100 symbols"}
                                })}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description.message}</p>
                            )}
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex justify-between">
                        <Button
                            type="submit"
                            className="cursor-pointer"
                            form="create-form"
                        >
                            Create
                        </Button>
                        <Button
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default TodoForm;