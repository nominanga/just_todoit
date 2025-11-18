import { Navigate } from "react-router-dom";
import { useAppSelector} from "@/hooks/reduxTypedHooks.ts";
import {type JSX} from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuth = useAppSelector(state => state.login.isAuthenticated);

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
