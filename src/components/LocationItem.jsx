import { Link } from 'react-router-dom'

function LocationItem({ location }) {
    return (
        <Link
            className="overflow-hidden bg-white transition-all duration-300"
            to={`/location/${location.id}?lat=${location.lat}&lng=${location.lng}`}
        >
            <div className="flex flex-col">
                <div className="flex flex-1">
                    <img
                        src={location.images[0].image_link}
                        alt=""
                        className="aspect-square w-1/2 object-cover"
                    />
                    <img
                        src={location.images[1].image_link}
                        alt=""
                        className="aspect-square w-1/2 object-cover"
                    />
                </div>
                <h3 className="mx-5 mb-3 mt-5 text-[20px]/[116%]">
                    {location.name}
                </h3>

                <div className="mx-5 mb-5 flex">
                    <div className="flex flex-col">
                        <div className="mb-3 text-sm/[116%]">
                            {location.location}
                        </div>
                        <div className="w-fit rounded-full bg-orange-300 px-3 py-2 text-sm/[116%]">
                            {location.project}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default LocationItem
