import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Card(props) {
    const { id, petName, animalType, sex, breed, petAge } = props.animals;

    let convert;

    if (sex === "F") convert = "Female";
    if (sex === "M") convert = "Male";
    if (sex === "S") convert = "Spayed";
    if (sex === "N") convert = "Neutered";
    if (sex === "U") convert = "Undefined";

    return (
        <div className="max-w-xs mt-5 bg-white border border-gray-200 rounded-3xl shadow">
            <Link to={`${id}`}>
                <img className="rounded-t-3xl" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" alt="" />
            </Link>
            <div className="p-5">
                <Link to={`${id}`} className="flex justify-between items-center">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900">
                        {petName}
                    </h5>
                    {animalType === "CAT" ?
                        <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-90">
                            {animalType}
                        </span>
                        : animalType === "DOG" ?
                            <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
                                {animalType}
                            </span>
                            :
                            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-1.5 rounded">{animalType}</span>
                    }
                </Link>

                <p className="mt-2">Breed: {breed}</p>
                <div className="mt-2 mb-2 flex">
                    <span className="bg-gray-200 text-gray-500 text-base font-medium me-2 px-2.5 py-0.5 rounded-full">{convert}</span>
                    <p>{petAge}</p>
                </div>
            </div>
        </div>

    )
}

Card.propTypes = {
    animals: PropTypes.exact({
        id: PropTypes.number,
        petName: PropTypes.string,
        animalType: PropTypes.string, 
        sex: PropTypes.string, 
        breed: PropTypes.string, 
        petAge: PropTypes.string
    })
}

export function PreviewCard(props) {
    const {petName, sex, animalType, petAge, breed} = props.animals;

    let convert;

    if (sex === "F") convert = "Female";
    if (sex === "M") convert = "Male";
    if (sex === "S") convert = "Spayed";
    if (sex === "N") convert = "Neutered";
    if (sex === "U") convert = "Undefined";

    return (
        <div className="mt-5 bg-white border border-gray-200 rounded-3xl shadow flex w-full">
            <img className="rounded-l-3xl w-32" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" alt="" />
            <div className="p-5">
                <div className="flex justify-between items-center">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900">
                        {petName}
                    </h5>
                    {animalType === "CAT" ?
                        <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-90">
                            {animalType}
                        </span>
                        : animalType === "DOG" ?
                            <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
                                {animalType}
                            </span>
                            :
                            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-1.5 rounded">{animalType}</span>
                    }
                </div>

                <p className="mt-2">Breed: {breed}</p>
                <div className="mt-2 mb-2 flex">
                    <span className="bg-gray-200 text-gray-500 text-base font-medium me-2 px-2.5 py-0.5 rounded-full">{convert}</span>
                    <p>{petAge}</p>
                </div>
            </div>
        </div>
    )
}

PreviewCard.propTypes = {
    animals: PropTypes.exact({
        petName: PropTypes.string,
        animalType: PropTypes.string, 
        sex: PropTypes.string, 
        breed: PropTypes.string, 
        petAge: PropTypes.string
    })
}