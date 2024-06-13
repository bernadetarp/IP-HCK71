import axios from "../utils/axios";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
    let navigate = useNavigate();

    const [password, setPassword] = useState("");
    const { UserId, token } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios({
                method: "POST",
                url: `/reset-password/${UserId}/${token}`,
                data: {password: password}
            })

            navigate("/login")

        } catch (error) {
            console.error(error)
            // console.log(error.response.data.message);
        }
    }
    return (
        <div className="container bg-slate-200">
            <h3>Reset your Password</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        New Password
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
                <button type="submit" className="py-2 px-4 bg-slate-600">
                    Submit
                </button>
            </form>
        </div>
    )
}