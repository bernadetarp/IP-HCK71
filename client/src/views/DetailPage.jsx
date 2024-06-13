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
            let { data } = await axios.get(`/${id}`)
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
        <>
            <img
                className="h-40px object-cover w-full"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
                alt="image description"
            />
            <div className="p-5">
                <h3>{animals.petName}</h3>
                <p>{animals.animalType}</p>
                <p>{animals.breed}</p>
                <p>{animals.color}</p>
                <p>{animals.description}</p>
                <p>{animals.inDate}</p>
                <p>{animals.intakeType}</p>
                <p>{animals.petAge}</p>
                <p>{animals.petSize}</p>
                <p>{animals.price}</p>
                <p>{animals.sex}</p>
            </div>
            <div className="bottom-0 w-full fixed px-3 py-0.5 bg-white shadow-[40px_35px_60px_-15px_rgba(0,0,0,1)]">
                <Link to={`/${id}/application-form`}><button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-5 w-full">Adopt Now</button></Link>
            </div>
        </>
    )
}