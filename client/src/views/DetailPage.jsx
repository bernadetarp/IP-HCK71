import { useEffect, useState } from "react";
// import Card from "../components/Card";
import axios from "../utils/axios.js"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DetailPage() {
    const [animals, setAnimals] = useState([]);

    const { id } = useParams();

    const fetchAnimalById = async () => {
        try {
            let { data } = await axios.get(`/animals/${id}`)
            setAnimals(data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAnimalById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex justify-center bg-gray-100">
            <div className="w-3/4 h-screen">
                <div className="flex w-full justify-between items-center mb-6 mt-10">
                    <Link to="/" className='text-center align-middle'>
                        <i className='bx bx-left-arrow-alt'></i>
                        <span>Back to Homepage</span>
                    </Link>
                </div>
                <div className="max-w-sm mt-4 w-full lg:max-w-full lg:flex">
                    <div
                        className="h-80 lg:h-auto object-cover bg-center lg:w-80 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                        style={{ backgroundImage: `url(${animals.urlLink})` }}
                        title=""
                    ></div>
                    <div className="shadow-lg bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                            <p className="text-sm text-gray-600 flex items-center">
                                {animals.animalType}
                            </p>
                            <div className="text-gray-900 font-bold text-xl mb-2">
                                {animals.petName}
                            </div>
                            <p className="text-gray-700 text-base">
                                {animals.breed},
                                {animals.color}
                            </p>
                            <p className="text-gray-700 text-base">
                                {animals.description}
                            </p>
                            <p className="text-gray-700 text-base">
                                <p>{animals.inDate}</p>
                                <p>{animals.intakeType}</p>
                            </p>
                            <p className="text-gray-700 text-base">
                                <p>{animals.petAge}</p>
                                <p>{animals.petSize}</p>
                            </p>
                            <h3>Rp {animals.price}</h3>
                            <p>{animals.sex}</p>
                        </div>
                        <div className="bottom-0 w-full px-3 py-0.5 bg-white">
                            <Link to={`/transaction/${id}/application-form`}>
                                <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-5 w-full">Adopt Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}