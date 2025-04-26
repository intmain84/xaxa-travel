import { useEffect, useMemo, useState } from 'react'
import { Marker } from 'react-leaflet'
import { useNavigate, useParams } from 'react-router-dom'
import marker from '../assets/images/marker.svg'
import markerActive from '../assets/images/marker-active.svg'
import markerHover from '../assets/images/marker-active.svg'

const customMarkerOptions = {
    iconUrl: marker,
    iconSize: [28, 35],
    iconAnchor: [11, 30],
    tooltipAnchor: [15, -16],
    className: 'marker',
}

function MyMarker({ id, position, children }) {
    const [markerOptions, setMarkerOptions] = useState(customMarkerOptions)
    const [hoveredMarker, setHoveredMarker] = useState(false)

    const { id: locationId } = useParams()

    const navigate = useNavigate()

    const customMarker = L.icon({
        ...markerOptions,
    })

    const hoverMarker = L.icon({
        iconUrl: markerHover,
        iconSize: [28, 35],
        iconAnchor: [11, 30],
        tooltipAnchor: [15, -16],
        className: 'marker-hover',
    })

    useEffect(() => {
        if (Number(locationId) === id) {
            setMarkerOptions({
                iconUrl: markerActive,
                iconSize: [35, 47],
                iconAnchor: [15, 40],
                tooltipAnchor: [15, -20],
            })
        } else {
            setMarkerOptions(customMarkerOptions)
        }
    }, [locationId])

    const eventHandlers = {
        click() {
            navigate(`location/${id}?lat=${position[0]}&lng=${position[1]}`)
        },
        mouseover() {
            setHoveredMarker(true)
        },
        mouseout() {
            setHoveredMarker(false)
        },
    }

    return (
        <Marker
            icon={hoveredMarker ? hoverMarker : customMarker}
            position={position}
            eventHandlers={eventHandlers}
            zIndexOffset={Number(locationId) === id && 1000}
        >
            {children}
        </Marker>
    )
}

export default MyMarker
