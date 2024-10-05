import { useQuery } from '@tanstack/react-query'
import {
    MapContainer,
    Marker,
    TileLayer,
    Tooltip,
    useMap,
    useMapEvents,
} from 'react-leaflet'
import { getCoordinates } from '../services/apiLocations'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyMarker from './MyMarker'
import { useGeolocation } from '../hooks/useGeolocation'
import useUrlPosition from '../hooks/useUrlPosition'

function Map() {
    const [mapPosition, setMapPosition] = useState([
        49.35375571830993, 23.510742187500004,
    ])

    const {
        data: coord,
        isPending,
        isLoading,
        isFetching,
        error,
    } = useQuery({
        queryKey: ['coord'],
        queryFn: getCoordinates,
    })

    const { getPosition, position } = useGeolocation()

    const [mapLat, mapLng] = useUrlPosition()

    useEffect(() => {
        getPosition()
    }, [])

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    useEffect(() => {
        if (position) setMapPosition([position.lat, position.lng])
    }, [position])

    return (
        <div className="map-container">
            <MapContainer center={mapPosition} zoom={11}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {!isFetching &&
                    coord.map((pos) => (
                        <MyMarker
                            key={pos.id}
                            id={pos.id}
                            position={[pos.lat, pos.lng]}
                        >
                            <Tooltip>{pos.name}</Tooltip>
                        </MyMarker>
                    ))}
                <ClickGetPosition />
                <NewCenter position={mapPosition} />
            </MapContainer>
        </div>
    )
}

function NewCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
}

function ClickGetPosition({ onClick }) {
    const navigate = useNavigate()
    const map = useMapEvents({
        click: (e) => {
            navigate(`create?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        },
    })

    return null
}

export default Map
