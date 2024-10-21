import useGetUserLocations from '../hooks/useGetUserLocations.js'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import { showDateTime } from '../utilities/formatDateTime.js'
import { Link } from 'react-router-dom'

function Profile() {
    const { isLoggedIn } = useContext(UserContext)
    const { data, isPending, error } = useGetUserLocations(isLoggedIn)

    if (error && !isPending) return <div>{error.message}</div>
    if (!error && isPending) return <div>Loading...</div>
    if (!error && !isPending)
        return (
            <div className="flex flex-col gap-5">
                {data?.map((location) => (
                    <Link
                        to={`/location/${location.id}?lat=${location.lat}&lng=${location.lng}`}
                        key={location.id}
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
                ))}
            </div>
        )
}

export default Profile
