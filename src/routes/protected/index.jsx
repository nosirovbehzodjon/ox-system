import { useLocation } from "react-router";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import context from "../../context";
const Protected = () => {
    const signup = useContext(context);
    const location = useLocation();
    return signup.status ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace state={{ from: location }} />
    );
};

export default Protected;
