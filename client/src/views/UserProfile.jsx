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
    const [password, setPassword] = useState("");

    const fetchUser = async () => {
        try {
            let { data } = await axios.get(`/user/user-profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            setPassword(data.password)
            setName(data.name);
            setEmail(data.email);
            setImageUrl(data.imageUrl);
            setPhoneNumber(data.phoneNumber);
            console.log(data)

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
                    // email: email,
                    password: password,
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

            navigate("/")
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
            <div className="w-full flex justify-center">
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow flex justify-center">
                    <div className="flex flex-col items-center pb-10 w-1/2">
                        <div className="flex justify-end px-4 pt-4 w-full">
                            <button
                                id="dropdownButton"
                                data-dropdown-toggle="dropdown"
                                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100"
                                type="button"
                            >
                            </button>
                        </div>
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
                        <div className="flex mt-4 md:mt-6">
                            <Link
                                onClick={handleDelete}
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            >
                                Delete Account
                            </Link>
                        </div>
                        <form className="w-full" onSubmit={handleSubmit}>
                            <div className="mb-5 mt-5">
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
                                    placeholder="name@flowbite.com"
                                    required=""
                                />
                            </div>
                            <div className="mb-5 mt-5">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(event) => { setPassword(event.target.value) }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="name@flowbite.com"
                                    required=""
                                />
                            </div>
                            <div className="mb-5 mt-5">
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
                                    placeholder=""
                                    required=""
                                />
                            </div>
                            <div className="mb-5 mt-5">
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
                                    placeholder=""
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