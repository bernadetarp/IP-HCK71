export default function Card(props) {
    // console.log(props.animals)
    const { petName, animalType, sex, breed, petAge } = props.animals;

    let convert;

    if (sex === "F") convert = "Female";
    if (sex === "M") convert = "Male";
    if (sex === "S") convert = "Spayed";
    if (sex === "N") convert = "Neutered";
    if (sex === "U") convert = "Undefined"
    // if  



    return (
        <div className="max-w-xs mt-5 bg-white border border-gray-200 rounded-3xl shadow">
            <a href="#">
                <img className="rounded-t-3xl" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" alt="" />
            </a>
            <div className="p-5">
                <a href="#" className="flex justify-between items-center">
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
                </a>

                <p className="mt-2">Breed: {breed}</p>
                <div className="mt-2 mb-2 flex">
                    <span className="bg-gray-200 text-gray-500 text-base font-medium me-2 px-2.5 py-0.5 rounded-full">{convert}</span>
                    <p>{petAge}</p>
                </div>
            </div>
        </div>

    )
}