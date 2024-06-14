import axios from "../utils/axios";
import { useState } from "react"
import showToastError from "../utils/toast";
import { showToastSuccess } from "../utils/toast";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {data} = await axios({
                method: "POST",
                url: "/forgot-password",
                data: { email: email }
            })

            showToastSuccess(data?.message, "message")

        } catch (error) {
            showToastError(error.response?.data?.message || error.message, "error")
            console.error(error)
            // console.log(error.response.data.message);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100">
            <form className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-gray-900">
                    Enter Your Email
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
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="name@company.com"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}