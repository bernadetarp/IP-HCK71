import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from '@react-oauth/google';
import axios from "../utils/axios"
import showToastError from "../utils/toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios({
                method: "POST",
                url: "/login",
                data: {
                    email: email,
                    password: password
                }
            })

            localStorage.setItem("access_token", data.access_token)
            navigate("/")

        } catch (error) {
            showToastError(error.response?.data?.message || error.message, "error")
            console.log(error.response.data.message);
        }
    }

    async function handleCredentialResponse(response) {
        try {
            const { data } = await axios({
                method: "POST",
                url: "/login-google",
                headers: {
                    google_token: response.credential
                }
            })

            localStorage.setItem("access_token", data.access_token)
            navigate("/")

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        // console.log(import.meta.env.VITE_CLIENTID)
        window.onload = function () {
            // eslint-disable-next-line no-undef
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_CLIENTID,
                callback: handleCredentialResponse
            });
            // eslint-disable-next-line no-undef
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
            );
            // eslint-disable-next-line no-undef
            google.accounts.id.prompt(); // also display the One Tap dialog
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900">
                        Sign in to our platform
                    </h5>
                    <button type="submit" id="buttonDiv" className="w-full"></button>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="name@company.com"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="flex items-start">
                        <Link to="/forgot-password" className="ms-auto text-sm text-blue-700 hover:underline">Forgot Password?</Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Login to your account
                    </button>
                    <div className="text-sm font-medium text-gray-500 text-center">
                        Not registered?{" "}
                        <Link to="/register" className="text-blue-700 hover:underline">Create account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}