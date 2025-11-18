import {useParams} from "react-router-dom";
import {useGetTodoByIdQuery, useUpdateTodoByIdMutation} from "@/app/todoApi.ts";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";
import WebError from "@/components/ui/webError.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton.tsx";


const TodoPage = () => {

    const {id} = useParams();
    const [checked, setChecked] = useState<boolean>(false);

    const {data, isLoading, isError} = useGetTodoByIdQuery(Number(id));

    useEffect(() => {
        if (!isLoading && data) {
            //eslint-ignore
            setChecked(data.completed);
        }
    }, [data, isLoading])

    const [updateTodo] =
        useUpdateTodoByIdMutation();



    return (
        <div className="h-full flex flex-1 flex-col gap-5">

            {isError && <WebError>Can't load todo, so you can chill</WebError>}
            <Card>
                <CardHeader>
                    {isLoading ?
                        <Skeleton className="h-8 w-full m-5"/>
                        :
                        <>
                            <CardTitle className="text-4xl">{data?.title}</CardTitle>
                            <CardAction>
                                <Checkbox
                                    id={`check${data?.id}`}
                                    checked={checked}
                                    className="cursor-pointer size-6"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        updateTodo({id: Number(id), body: {completed: !(data?.completed)}})
                                        setChecked(!checked);
                                    }}
                                />
                            </CardAction>
                        </>
                    }
                </CardHeader>
                <CardContent>
                    {isLoading
                        ?
                        <Skeleton className="h-4 w-full m-5"/>
                        :
                        <>
                            <CardDescription className="text-md text-dark">
                                {data?.description}
                            </CardDescription>
                        </>
                    }
                </CardContent>
                <CardFooter>
                    {isLoading
                        ?
                        <Skeleton className="h-2 w-full m-5"/>
                        :
                        <>
                            <CardDescription>
                                due to {new Date((data?.createdAt ?? 0) * 1000).toLocaleString()}
                            </CardDescription>
                        </>
                    }
                </CardFooter>
            </Card>
        </div>
    );
};

export default TodoPage;