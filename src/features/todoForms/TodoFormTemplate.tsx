import {Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@radix-ui/react-label";
import {useCreateTodoMutation, useGetTodoByIdQuery, useUpdateTodoByIdMutation} from "@/app/todoApi.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {ITodo} from "@/app/types.ts";
import {useCallback, useEffect} from "react";
import {toast} from "sonner";
import {Spinner} from "@/components/ui/spinner.tsx";

interface TemplateProps{
    type: "create" | "update"
}

const TodoFormTemplate = ({type}: TemplateProps) => {
    const navigate = useNavigate();
    const [create, {isSuccess: isCreateSuccess, isLoading: isCreateLoading}] = useCreateTodoMutation();
    const [update, {isSuccess: isUpdateSuccess, isLoading: isUpdateLoading}] = useUpdateTodoByIdMutation();

    const {id} = useParams();
    const {data: todo} = useGetTodoByIdQuery(Number(id));

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

    const submitCreate = useCallback<SubmitHandler<ITodo>>((data) => {
        data.completed = false;
        data.createdAt = Math.floor(Date.now() / 1000);

        data.title = data.title.length ? data.title : "No title";
        create(data);
    }, [create]);

    const submitUpdate = useCallback<SubmitHandler<ITodo>>((data) => {
        if (todo === undefined) {
            return;
        }
        const newTitle = (data.title.length > 0) ? data.title : todo?.title;
        const newDescription = (data.description.length > 0) ? data.description : todo?.description;
        update({id: Number(id), body: {title: newTitle, description: newDescription}});
    }, [update, id, todo]);

    useEffect(() => {
        if (!isCreateLoading && isCreateSuccess) {
            toast.success("Todo is created");
            setTimeout(() => navigate("/"), 1000);
        }
    }, [isCreateLoading, isCreateSuccess, navigate]);

    useEffect(() => {
        if (!isUpdateLoading && isUpdateSuccess) {
            toast.success(`Todo ${id} is updated`);
            setTimeout(() => navigate("/"), 1000);
        }
    }, [isUpdateSuccess, isUpdateLoading, navigate, id]);


    return (
        <div className="todo-form-container">
            <Card>
                <CardHeader>
                    <CardTitle>{(type === "create") ? "Create new todo" : `Update todo ${id}`}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit((type === "create") ? submitCreate : submitUpdate)}
                        className="grid gap-5" id="create-form"
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="title">{type==="create" ? "Title" : "New title"}</Label>
                            <Input
                                id="title"
                                type="text"
                                {...register("title", {
                                    maxLength: {value: 30, message: "Title length must be under 30 symbols"}
                                })}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">{errors.title.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">{type==="create" ? "Description" : "New description"}</Label>
                            <Textarea
                                id="description"
                                {...register("description", {
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
                            disabled={isCreateLoading || isUpdateLoading || isCreateSuccess || isUpdateSuccess}
                        >
                            {isCreateLoading || isUpdateLoading?
                                <Spinner/>
                                :
                                <p>Confirm</p>
                            }
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

export default TodoFormTemplate;