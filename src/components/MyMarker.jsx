import { useEffect, useMemo, useState } from 'react'
import { Marker } from 'react-leaflet'
import { useNavigate, useParams } from 'react-router-dom'
import marker from '../assets/images/marker.svg'
import markerActive from '../assets/images/marker-active.svg'

const initialIconOptions = {
    iconUrl: marker,
    iconSize: [28, 35],
    iconAnchor: [11, 30],
    tooltipAnchor: [15, -16],
    className: 'marker',
}

function MyMarker({ id, position, children }) {
    const [iconOptions, setIconOptions] = useState(initialIconOptions)

    const { id: locationId } = useParams()

    const navigate = useNavigate()

    const customIcon = L.icon({
        ...iconOptions,
    })

    useEffect(() => {
        console.log(Number(locationId) === id)
        if (Number(locationId) === id) {
            setIconOptions({
                iconUrl: markerActive,
                iconSize: [35, 47],
                iconAnchor: [15, 40],
                tooltipAnchor: [15, -20],
            })
        } else {
            setIconOptions(initialIconOptions)
        }
    }, [locationId])

    const eventHandlers = useMemo(
        () => ({
            click() {
                navigate(`location/${id}?lat=${position[0]}&lng=${position[1]}`)
            },
        }),
        [id, locationId]
    )

    return (
        <Marker
            icon={customIcon}
            position={position}
            eventHandlers={eventHandlers}
            zIndexOffset={Number(locationId) === id && 1000}
        >
            {children}
        </Marker>
    )
}

export default MyMarker
