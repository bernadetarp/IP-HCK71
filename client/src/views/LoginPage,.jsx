import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from '@react-oauth/google';
import axios from "../utils/axios"

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
        <>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900">
                        Sign in to our platform
                    </h5>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Your email
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                            className="form-control"
                            id="email"
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
                            className="form-control"
                            id="password"
                        />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    defaultValue=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                    required=""
                                />
                            </div>
                            <label
                                htmlFor="remember"
                                className="ms-2 text-sm font-medium text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>
                        <a
                            href="#"
                            className="ms-auto text-sm text-blue-700 hover:underline"
                        >
                            Lost Password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Login to your account
                    </button>
                    <div className="text-sm font-medium text-gray-500">
                        Not registered?{" "}
                        <a href="#" className="text-blue-700 hover:underline">
                            Create account
                        </a>
                    </div>
                    <button type="submit" id="buttonDiv"></button>
                </form>
            </div>





            <div className="container bg-slate-200">
                <h3>Login to Your Account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                            className="form-control"
                            id="email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            className="form-control"
                            id="password"
                        />
                    </div>
                    <div className="set-password">
                        <Link to="/forgot-password">Forgot Password</Link>
                    </div>
                    <button type="submit" className="py-2 px-4 bg-slate-600">
                        Submit
                    </button>
                    {/* <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                            handleCredentialResponse(credentialResponse.credential)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />; */}
                    <button type="submit" id="buttonDiv"></button>
                </form>
            </div>

        </>
    )
}