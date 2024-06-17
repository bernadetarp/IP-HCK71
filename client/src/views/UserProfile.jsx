import axios from "../utils/axios";
import { useState, useEffect } from "react";
import showToastError from "../utils/toast";
import { Link, useNavigate } from "react-router-dom";
import { showToastSuccess } from "../utils/toast";

export default function UserProfile() {

    let navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const fetchUser = async () => {
        try {
            let { data } = await axios.get(`/user/user-profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            setName(data.name);
            setEmail(data.email);
            setImageUrl(data.imageUrl);
            setPhoneNumber(data.phoneNumber);

        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios({
                url: `/user/user-profile`,
                method: "PUT",
                data: {
                    name: name,
                    imageUrl: imageUrl,
                    phoneNumber: phoneNumber,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            localStorage.getItem("access_token");
            showToastSuccess(data?.message, "message")
            await fetchUser()

        } catch (error) {
            console.log(error.response.data.message);
            showToastError(error.response?.data?.message || error.message, "error")
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios({
                url: `/user/user-profile`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            navigate("/login")
            showToastSuccess(data?.message, "message")

        } catch (error) {
            showToastError(error.response?.data?.message || error.message, "error")
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="w-full flex justify-center items-center bg-gray-100">
                <div className="w-full max-w-lg my-10 bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
                    <div className="flex w-full justify-between items-center mb-6">
                        <Link to="/" className='text-center align-middle'>
                            <i className='bx bx-left-arrow-alt'></i>
                            <span>Back to Homepage</span>
                        </Link>
                        <Link
                            onClick={handleDelete}
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Delete Account
                        </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center pb-10 w-full">
                        <img
                            className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
                            src={imageUrl}
                            alt="Bonnie image"
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900">
                            {name}
                        </h5>
                        <span className="text-sm text-gray-500">
                            {email}
                        </span>
                        <form className="w-full" onSubmit={handleSubmit}>
                            <div className="mb-5 mt-5 w-full max-w-md">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(event) => { setName(event.target.value) }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Your Name"
                                    required=""
                                />
                            </div>
                            <div className="mb-5 mt-5 w-full max-w-md">
                                <label
                                    htmlFor="phoneNumber"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(event) => { setPhoneNumber(event.target.value) }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Your Phone Number"
                                    required=""
                                />
                            </div>
                            <div className="mb-5 mt-5 w-full max-w-md">
                                <label
                                    htmlFor="imageUrl"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Image Url
                                </label>
                                <input
                                    type="text"
                                    id="imageUrl"
                                    value={imageUrl}
                                    onChange={(event) => { setImageUrl(event.target.value) }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Image URL"
                                    required=""
                                />
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center justify-center"
                            >
                                Update Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}