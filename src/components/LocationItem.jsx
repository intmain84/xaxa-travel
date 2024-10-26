import { showDateTime } from '../utilities/formatDateTime.js'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useDeleteLocation from '../hooks/useDeleteLocation.jsx'

function LocationItem({ location }) {
    const [isMenuOpened, setIsMenuOpened] = useState(false)

    //MUTATION
    const { deleteLocation, isPendingDelete, errorDelete } = useDeleteLocation()

    function handleDeleteLocation() {
        const data = {
            id: location.id,
            images: location.images,
        }
        deleteLocation(data)
    }

    return (
        <div>
            <Link
                to={`/location/${location.id}?lat=${location.lat}&lng=${location.lng}`}
            >
                <img
                    src={location.images[0].image_link}
                    alt=""
                    className="aspect-video w-15 object-cover"
                />
                <div>Loc name: {location.name}</div>
                <div>Loc description: {location.description}</div>
                <div>Created: {showDateTime(location.created_at)}</div>
            </Link>

            <div className="relative">
                <div onClick={() => setIsMenuOpened((prev) => !prev)}>—</div>
                {isMenuOpened && (
                    <div className="absolute flex flex-col bg-amber-200 p-3">
                        <div onClick={handleDeleteLocation}>Delete</div>
                        <div>Hide</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LocationItem
