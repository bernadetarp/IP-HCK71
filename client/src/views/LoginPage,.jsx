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