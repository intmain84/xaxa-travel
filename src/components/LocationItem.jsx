import { showDateTime } from '../utilities/formatDateTime.js'
import { Link } from 'react-router-dom'

function LocationItem({ location }) {
    return (
        <Link
            className="p-5 transition-all duration-300"
            to={`/location/${location.id}?lat=${location.lat}&lng=${location.lng}`}
        >
            <div className="flex gap-4">
                <img
                    src={location.images[0].image_link}
                    alt=""
                    className="aspect-square w-12 object-cover"
                />
                <div className="flex flex-col">
                    <h3>{location.name}</h3>
                    <span>{showDateTime(location.created_at)}</span>
                </div>
            </div>
            <p className="mt-4 line-clamp-3">{location.description}</p>
        </Link>
    )
}

export default LocationItem
