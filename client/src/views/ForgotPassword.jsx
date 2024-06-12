import axios from "axios";
import { useState } from "react"

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios({
                method: "POST",
                url: "http://localhost:3000/forgot-password",
                data: {email: email}
            })

        } catch (error) {
            console.error(error)
            // console.log(error.response.data.message);
        }
    }
    return (
        <div className="container bg-slate-200">
            <h3>Enter your Email</h3>
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
                <button type="submit" className="py-2 px-4 bg-slate-600">
                    Submit
                </button>
            </form>
        </div>
    )
}