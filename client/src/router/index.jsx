import { createBrowserRouter, redirect } from "react-router-dom";

import Register from "../views/RegisterPage"; 
import Login from "../views/LoginPage,";
import ForgotPassword from "../views/ForgotPassword";
import ResetPassword from "../views/ResetPassword";
import Homepage from "../views/HomePage";
import Payment from "../views/PaymentPage";
import DetailPage from "../views/DetailPage";
import FormApplication from "../views/FormApplication";

const router = createBrowserRouter([
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
        loader: () => {
            return localStorage.getItem("access_token") ? redirect("/") : null;
        }
    },
    {
        path: "/reset-password/:UserId/:token",
        element: <ResetPassword />,
        loader: () => {
            return localStorage.getItem("access_token") ? redirect("/") : null;
        }
    },
    {
        path: "/register",
        element: <Register />,
        loader: () => {
            return localStorage.getItem("access_token") ? redirect("/") : null;
        }
    },
    {
        path: "/login",
        element: <Login />,
        loader: () => {
            return localStorage.getItem("access_token") ? redirect("/") : null;
        }
    },
    {
        path: "/",
        element: <Homepage />
    },
    {
        path: "/user-profile",
        element: <div>User Profile</div>
    },
    {
        path: "/:id",
        element: <DetailPage />
    },
    {
        path: "/:id/application-form",
        element: <FormApplication />,
        loader: () => {
            return !localStorage.getItem("access_token") ? redirect("/:id") : null;
        }
    },
    {
        path: "/:id/payment",
        element: <Payment />,
        loader: () => {
            return !localStorage.getItem("access_token") ? redirect("/login") : null;
        }
    },
])

export default router;