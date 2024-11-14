import { useParams } from 'react-router-dom'
import SpinnerFull from '../components/SpinnerFull.jsx'
import Button from '../components/Button.jsx'
import useGetLocation from '../hooks/useGetLocation.js'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import useDeleteLocation from '../hooks/useDeleteLocation.jsx'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

function Location() {
    const { id } = useParams()

    const { isLoggedIn } = useContext(UserContext)

    const { data: location, isPending, error } = useGetLocation(id)

    const [index, setIndex] = useState(-1)

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
            <div className="mx-4 mt-9 rounded-lg bg-toxic-green p-5 text-dark-green transition-all duration-300">
                <h1>{location.name}</h1>
                <div className="my-4 flex gap-3">
                    {location.images.length > 0 &&
                        location.images.map((image, i) => (
                            <img
                                key={image.id}
                                src={image.image_link}
                                alt={location.name}
                                className="aspect-square w-12 rounded-sm object-cover"
                                onClick={() => setIndex(i)}
                            />
                        ))}
                    <Lightbox
                        index={index}
                        open={index >= 0}
                        close={() => setIndex(-1)}
                        slides={location.images.map((image) => {
                            return {
                                src: image.image_link,
                            }
                        })}
                    />
                </div>

                <div>{location.description}</div>
                <div className="my-4 flex items-center gap-3">
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
            </div>
        )
    }
}

export default Location
