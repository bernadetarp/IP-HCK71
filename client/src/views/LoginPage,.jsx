import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log({name, email, password})

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {data} = await axios({
                method: "POST",
                url: "http://localhost:3000/login",
                data: {
                    email: email,
                    password: password
                }
            })

            localStorage.setItem("access_token", data.access_token)
            navigate("/")
            
        } catch (error) {
            console.log(error.response.data.message);
            // console.error(error);
        }
    }
    
    return (
        <>
            <div className="container bg-slate-200">
                <h3>Create new account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value)}}
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
                            onChange={(event) => { setPassword(event.target.value)}}
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
                </form>
            </div>

        </>
    )
}