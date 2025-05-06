import { useParams } from 'react-router-dom'
import SpinnerFull from '../components/SpinnerFull.jsx'
import Button from '../components/Button.jsx'
import useGetLocation from '../hooks/useGetLocation.js'
import { useContext, useState } from 'react'
import { Context } from '../context/Context.jsx'
import useDeleteLocation from '../hooks/useDeleteLocation.js'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import PrevLightboxIc from '../components/icons/PrevLightboxIc.jsx'
import NextLightboxIc from '../components/icons/NextLightboxIc.jsx'
import CloseLightboxIc from '../components/icons/CloseLightboxIc.jsx'
import { MapPin } from 'lucide-react'

function Location() {
    const { id } = useParams()

    const { session } = useContext(Context)

    const { data: location, isPending, error } = useGetLocation(id)

    const [index, setIndex] = useState(-1)

    //MUTATION
    const { deleteLocation, isPendingDelete, errorDelete } =
        useDeleteLocation('redirect')

    function handleDeleteLocation() {
        const data = { id, images: location.images }
        deleteLocation(data)
    }

    //ERROR
    if (error && !isPending) return <div>{error.message}</div>

    //LOADING
    if (isPending && !error) return <SpinnerFull />

    //DATA
    if (!isPending && !error) {
        return (
            <div className="m-4 mx-auto flex max-w-[620px] flex-col justify-between bg-white p-4">
                <div>
                    <h1 className="mt-4">{location.name}</h1>
                    <div className="my-3 w-fit rounded-full bg-orange-300 px-3 py-2">
                        {location.project}
                    </div>
                    {isPending && 'Loading...'}
                    {!isPending && (
                        <div className="my-4 flex gap-4">
                            {location.images.length > 0 &&
                                location.images.map((image, i) => (
                                    <img
                                        key={image.id}
                                        src={image.image_link}
                                        alt={location.name}
                                        className="aspect-video w-[calc(50%-8px)] cursor-pointer object-cover transition-all duration-300 hover:opacity-60"
                                        onClick={() => setIndex(i)}
                                    />
                                ))}
                            <Lightbox
                                render={{
                                    iconPrev: () => <PrevLightboxIc />,
                                    iconNext: () => <NextLightboxIc />,
                                    iconClose: () => <CloseLightboxIc />,
                                }}
                                styles={{
                                    container: {
                                        backgroundColor: 'rgba(0, 0, 0, .1)',
                                        backdropFilter: 'blur(20px)',
                                    },
                                }}
                                index={index}
                                open={index >= 0}
                                close={() => setIndex(-1)}
                                slides={location.images.map((image) => {
                                    return { src: image.image_link }
                                })}
                            />
                        </div>
                    )}

                    <div>{location.description}</div>
                    <div className="my-4 flex w-fit items-center gap-2 rounded-full bg-gray-200 py-2 pl-3 pr-4">
                        <MapPin size={20} /> <span>{location.location}</span>
                    </div>
                    <div className="my-4 flex items-center gap-3">
                        <img
                            src={location.profiles.avatar_url}
                            alt=""
                            className="w-6 rounded-full"
                        />
                        <span>{location.profiles.full_name}</span>
                    </div>
                </div>
                {session?.user?.id === location.user_id && (
                    <div className="mt-4 flex justify-between gap-3">
                        <Button
                            href={`/location/edit/${id}?lat=${location.lat}&lng=${location.lng}`}
                        >
                            Edit
                        </Button>
                        <Button variant="danger" onClick={handleDeleteLocation}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        )
    }
}

export default Location
