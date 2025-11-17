import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import "./loginForm.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { AuthCredentials } from "@/app/types";
import { useActions } from "@/hooks/actions";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const LoginForm = () => {
    const { login } = useActions();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthCredentials>({
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const [isSubmitError, setIsSubmitError] = useState(false);

    const submit: SubmitHandler<AuthCredentials> = async (data) => {
        if (data.username === "admin" && data.password === "123") {
            login();
            navigate("/");
        } else {
            setIsSubmitError(true);
        }
        return;
    };

    return (
        <div className="form-container">
            <Card className="login-form-card">
                <CardHeader className="flex justify-center">
                    <CardTitle className="text-xl text-nowrap">Login to your account</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(submit)} className="space-y-6">

                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm">{errors.username.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                            {isSubmitError && (
                                <p className="text-red-500 text-sm align-middle font-semibold">Invalid Credentials</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full cursor-pointer">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginForm;
