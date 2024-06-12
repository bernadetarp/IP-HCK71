import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log({name, email, password})

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios({
                method: "POST",
                url: "http://localhost:3000/register",
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            })

            navigate("/login")
            
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    
    return (
        <>
            <div className="container bg-slate-200">
                <h3>Create new account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-4">
                        <label htmlFor="name" className="form-label">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(event) => { setName(event.target.value)}}
                            className="form-control"
                            id="name"
                        />
                    </div>
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
                    <button type="submit" className="py-2 px-4 bg-slate-600">
                        Submit
                    </button>
                </form>
            </div>

        </>
    )
}