import { useNavigate, useParams } from 'react-router-dom'
import SpinnerFull from '../components/SpinnerFull.jsx'
import Button from '../components/Button.jsx'
import useGetLocation from '../hooks/useGetLocation.js'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import useDeleteLocation from '../hooks/useDeleteLocation.jsx'

function Location() {
    const { id } = useParams()
    const navigate = useNavigate()

    const { isLoggedIn } = useContext(UserContext)

    const { data: location, isPending, error } = useGetLocation(id)

    //MUTATION
    const { deleteLocation, isPendingDelete, errorDelete } =
        useDeleteLocation('redirect')

    function handleDeleteLocation() {
        const data = {
            id,
            images: location.images,
        }
        deleteLocation(data)
    }

    //ERROR
    if (error && !isPending) return <div>{error.message}</div>

    //LOADING
    if (isPending && !error) return <SpinnerFull />

    //DATA
    if (!isPending && !error) {
        return (
            <>
                <h1>{location.name}</h1>
                <div className="flex gap-3">
                    <div>
                        <div onClick={() => navigate(-1)}>Назад</div>
                    </div>
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
                    <>
                        <Button
                            secondary
                            to={`/location/edit/${id}?lat=${location.lat}&lng=${location.lng}`}
                        >
                            Edit
                        </Button>
                        <Button onClick={handleDeleteLocation}>Delete</Button>
                    </>
                )}
            </>
        )
    }
}

export default Location
