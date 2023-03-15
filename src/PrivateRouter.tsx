import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

export const PrivateRouter = ({ Component }: { Component: React.FC | any }) => {
    const { token } = useAuth();

    if (token) return <Component />;
    return <Navigate to={"login"} replace={true} />;
};