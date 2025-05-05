import { Link } from 'react-router-dom'

function LocationItem({ location }) {
    return (
        <li className="overflow-hidden bg-white transition-all duration-300">
            <Link
                to={`/location/${location.id}?lat=${location.lat}&lng=${location.lng}`}
            >
                <div className="flex flex-col">
                    <img
                        src={location.images[0].image_link}
                        alt=""
                        className="aspect-video w-full object-cover"
                    />

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
        </li>
    )
}

export default LocationItem
