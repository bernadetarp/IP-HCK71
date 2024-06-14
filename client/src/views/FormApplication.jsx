import { useEffect, useState } from "react";
import showToastError from "../utils/toast.js";
// import Card from "../components/Card";
import axios from "../utils/axios.js"
import { useNavigate, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import { PreviewCard } from "../components/Card.jsx";

export default function FormApplication() {
    const [animals, setAnimals] = useState([]);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    // const [havingChildren, setHavingChildren] = useState("")
    // const [address, setAddress] = useState("");
    // const [householdType, sethouseHoldType] = useState([])
    // const [isHavingPets, setIsHavingPets] = useState(false);
    // const [isAgree, setIsAgree] = useState(false);

    const { id } = useParams();
    let navigate = useNavigate();

    const fetchUser = async () => {
        try {
            let { data } = await axios.get(`/user/user-profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            setName(data.name);
            setEmail(data.email);
            setPhoneNumber(data.phoneNumber);

        } catch (error) {
            showToastError(error.response?.data?.message || error.message, "error")
            console.error(error);
        }
    }

    const fetchAnimalById = async () => {
        try {
            let { data } = await axios.get(`/${id}`)
            setAnimals(data);

        } catch (error) {
            console.error(error);
        }
    }

    // name, email, address, phoneNumber, householdType, isHavingPets, isHavingChildren, isAgree

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // await axios({
            //     method: "POST",
            //     url: `/${id}/application-form`,
            //     data: {
            //         name: name,
            //         email: email,
            //         phoneNumber: phoneNumber,
            //         addres: address,
            //         havingChildren: havingChildren,
            //         householdType: householdType,
            //         isHavingPets: isHavingPets,
            //         isAgree: isAgree
            //     },
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem("access_token")}`
            //     }
            // })

            navigate(`/transaction/${id}/payment`)

        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchUser(),
            fetchAnimalById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-4">
            <PreviewCard key={id} animals={animals} />
            <form className="max-w-sm mt-5 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => { setName(event.target.value) }}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="name@flowbite.com"
                        required={true}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required={true}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="repeat-password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(event) => { setPhoneNumber(event.target.value) }}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required={true}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="repeat-password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        How many childen (ages)?
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required={true}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="repeat-password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Describe your household
                    </label>
                    <div className="flex items-center gap-3">
                        <input
                            defaultChecked=""
                            id="default-radio-2"
                            type="radio"

                            defaultValue=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="default-radio-2"
                            className="ms-1 text-sm font-medium text-gray-900"
                        >
                            Active
                        </label>
                        <input
                            defaultChecked=""
                            id="default-radio-2"
                            type="radio"
                            defaultValue=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="default-radio-2"
                            className="ms-1 text-sm font-medium text-gray-900"
                        >
                            Calm
                        </label>
                        <input
                            defaultChecked=""
                            id="default-radio-2"
                            type="radio"
                            defaultValue=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="default-radio-2"
                            className="ms-1 text-sm font-medium text-gray-900"
                        >
                            Noisy
                        </label>
                        <input
                            defaultChecked=""
                            id="default-radio-2"
                            type="radio"
                            defaultValue=""
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="default-radio-2"
                            className="ms-1 text-sm font-medium text-gray-900"
                        >
                            Quite
                        </label>
                    </div>
                </div>



                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            type="checkbox"
                            
                            defaultValue=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                            required={true}
                        />
                    </div>
                    <label
                        htmlFor="terms"
                        className="ms-2 text-sm font-medium text-gray-900"
                    >
                        I agree with the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            terms and conditions
                        </a>
                    </label>
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