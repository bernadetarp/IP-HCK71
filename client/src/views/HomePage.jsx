import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "../utils/axios.js"

export default function Homepage() {
    const [animals, setAnimals] = useState([]);

    const fetchAnimals = async () => {
        try {
            let { data } = await axios.get("/")
            setAnimals(data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAnimals()
    }, [])

    return (
        <>
            <div className="flex flex-col justify-center items-center bg-slate-100">
                {animals.map(animals => {
                    return <Card key={animals.id} animals={animals} />
                })}
            </div>
        </>
    )
}