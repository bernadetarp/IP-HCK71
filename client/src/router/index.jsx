import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "../views/RegisterPage"; 
import Login from "../views/LoginPage,";
import ForgotPassword from "../views/ForgotPassword";
import ResetPassword from "../views/ResetPassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello World!</div>,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
        loader: () => {
            return localStorage.getItem("access_token") ? redirect("/") : null;
        }
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/reset-password/:UserId/:token",
        element: <ResetPassword />,
    },
])

export default router;