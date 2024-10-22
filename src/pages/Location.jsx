import { Link, useNavigate, useParams } from 'react-router-dom'
import SpinnerFull from '../components/SpinnerFull.jsx'
import Button from '../components/Button.jsx'
import useGetLocation from '../hooks/useGetLocation.js'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    createLocation as createLocationApi,
    deleteLocationApi,
} from '../services/apiLocations.js'

function Location() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { id } = useParams()

    const { isLoggedIn } = useContext(UserContext)

    const { data: location, isPending, error } = useGetLocation(id)

    //MUTATION
    const { mutate: deleteLocation, isPending: isPendingDelete } = useMutation({
        mutationFn: deleteLocationApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['userLocations'],
            })
            queryClient.invalidateQueries({
                queryKey: ['coord'],
            })
            navigate('/profile')
        },
        onError: (error) => {
            console.log(error)
            //Отработать тут ошибки
        },
    })

    function handleDeleteLocation() {
        const data = {
            id,
            images: location.images
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
                <div className="flex gap-3">
                    <div>
                        <Link to="/profile">Назад</Link>
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
                    <>
                        <Button secondary to={`/location/${id}/edit`}>
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
