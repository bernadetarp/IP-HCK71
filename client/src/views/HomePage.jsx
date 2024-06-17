import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "../utils/axios.js"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
    const [animals, setAnimals] = useState([]);
    const [imageUrl, setImageUrl] = useState("")

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUser = async () => {
        try {
            let { data } = await axios.get(`/user/user-profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            setImageUrl(data.imageUrl);

        } catch (error) {
            console.error(error);
        }
    }

    const fetchAnimals = async () => {
        try {
            let { data } = await axios.get("/animals/", {
                params: {
                    search: search,
                    // filter: selectedType,
                    // sort
                }
            })
            setAnimals(data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAnimals(),
        fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const submitSearch = () => {
        if (currentPage !== 1) {
            setCurrentPage(1)
        } else {
            fetchAnimals()
        }
    }

    const handleSearch = (event) => {
        event.preventDefault();
        submitSearch(search);
    }

    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/")
    }


    return (
        <>

            <nav className="bg-white border-gray-200 w-full z-10 px-10">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
                    <a
                        href="https://flowbite.com/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">
                            PawRescue
                        </span>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {(!localStorage.getItem("access_token")) ?
                            <Link to="/login"><button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                            >
                                Login
                            </button></Link>
                            :
                            <div className="flex gap-4 items-center">

                                <Link to="/user-profile"><button
                                    type="button"
                                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    data-dropdown-toggle="user-dropdown"
                                    data-dropdown-placement="bottom"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="w-8 h-8 rounded-full object-cover border-solid"
                                        src={imageUrl}
                                        alt="user photo"
                                    />
                                </button>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    type="submit"
                                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                >
                                    Logout
                                </button>
                            </div>
                        }
                    </div>
                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                        id="navbar-cta"
                    >
                    </div>
                </div>
            </nav>


            <div className="justify-center h-screen">
                <div className="flex bg-slate-100 justify-center px-8 md:justify-end md:px-[128px] xl:justify-end">
                    <form className=" mt-5 w-80" onSubmit={handleSearch}>
                        <label
                            htmlFor="default-search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="search.."
                                required=""
                            />
                            <button
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex pb-10 justify-center items-center bg-slate-100 xl:flex flex-wrap gap-4">
                    {animals.map(animals => {
                        return <Card key={animals.id} animals={animals} />
                    })}
                </div>

            </div>
        </>
    )
}