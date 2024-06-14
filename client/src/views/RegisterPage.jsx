import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axios"
import showToastError from "../utils/toast";
import { showToastSuccess } from "../utils/toast";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {data} = await axios({
                method: "POST",
                url: "/register",
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            })

            navigate("/login")
            showToastSuccess(data?.message, "message")

        } catch (error) {
            showToastError(error.response?.data?.message || error.message, "error")
            console.log(error.response.data.message);
        }
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900">Create new account</h5>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="name@company.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                Your password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Register
                        </button>
                        <div className="text-sm font-medium text-gray-500 text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-700 hover:underline">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}