import { useEffect, useMemo, useState } from 'react'
import { Marker } from 'react-leaflet'
import { useNavigate, useParams } from 'react-router-dom'

function MyMarker({ id, position, children }) {
    const { id: locationId } = useParams()

    const [animation, setAnimation] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (id === Number(locationId)) {
            setAnimation(true)
        } else {
            setAnimation(false)
        }
    }, [id, locationId])

    const eventHandlers = useMemo(
        () => ({
            click() {
                navigate(`location/${id}`)
            },
        }),
        [id, locationId]
    )

    return (
        <Marker
            className={`${animation ? 'bouncing-marker' : ''}`}
            position={position}
            eventHandlers={eventHandlers}
        >
            {children}
        </Marker>
    )
}

export default MyMarker
