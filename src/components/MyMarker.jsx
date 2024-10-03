import { useMemo } from 'react'
import { Marker } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'

function MyMarker({ id, position, children }) {
    const navigate = useNavigate()

    const eventHandlers = useMemo(
        () => ({
            click() {
                navigate(`location/${id}`)
            },
        }),
        []
    )

    return (
        <Marker position={position} eventHandlers={eventHandlers}>
            {children}
        </Marker>
    )
}

export default MyMarker
