import { useParams } from 'react-router-dom'
import SpinnerFull from '../components/SpinnerFull.jsx'
import Button from '../components/Button.jsx'
import useGetLocation from '../hooks/useGetLocation.js'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'

function Location() {
    const { id } = useParams()

    const { isLoggedIn } = useContext(UserContext)

    const { data: location, isPending, error } = useGetLocation(id)

    //ERROR
    if (error && !isPending) return <div>{error.message}</div>

    //LOADING
    if (isPending && !error) return <SpinnerFull />

    //DATA
    if (!isPending && !error) {
        return (
            <>
                <div className="flex gap-3">
                    {location.images.length > 0 &&
                        location.images.map((image) => (
                            <img
                                key={image.id}
                                src={image.image_link}
                                alt=""
                                className="w-15"
                            />
                        ))}
                </div>
                <div>Location: {location.name}</div>
                <div>Description: {location.description}</div>
                <div className="flex items-center gap-3">
                    <img
                        src={location.profiles.avatar_url}
                        alt=""
                        className="w-6 rounded-full"
                    />
                    <span>{location.profiles.full_name}</span>
                </div>
                {isLoggedIn === location.user_id && (
                    <Button secondary to={`/location/${id}/edit`}>
                        Edit
                    </Button>
                )}
            </>
        )
    }
}

export default Location
