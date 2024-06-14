import axios from "../utils/axios";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import showToastError from "../utils/toast";
import { showToastSuccess } from "../utils/toast";

export default function ResetPassword() {
    let navigate = useNavigate();

    const [password, setPassword] = useState("");
    const { UserId, token } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios({
                method: "POST",
                url: `/reset-password/${UserId}/${token}`,
                data: { password: password }
            })

            navigate("/login")
            showToastSuccess(data?.message, "message")

        } catch (error) {
            showToastError(error.response?.data?.message || error.message, "error")
            console.error(error)
            // console.log(error.response.data.message);
        }
    }
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-lg p-5">
                    <form className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900">
                            Reset Password
                        </h5>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Your New Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder=""
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
            </div>
        </>
    )
}