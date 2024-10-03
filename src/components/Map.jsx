import { useQuery } from '@tanstack/react-query'
import {
    MapContainer,
    Marker,
    TileLayer,
    Tooltip,
    useMapEvents,
} from 'react-leaflet'
import { getCoordinates } from '../services/apiLocations'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyMarker from './MyMarker'

function Map() {
    const [mapPosition, setMapPosition] = useState([50.41373, 80.2563078])
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

    return (
        <div className="map-container">
            <MapContainer center={mapPosition} zoom={13}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* {!isFetching &&
                    coord.map((pos) => (
                        <Marker key={pos.id} position={[pos.lat, pos.lng]}>
                            <Tooltip>{pos.name}</Tooltip>
                        </Marker>
                    ))} */}
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
            </MapContainer>
        </div>
    )
}

function ClickGetPosition() {
    const navigate = useNavigate()
    useMapEvents({
        click: (e) => {
            navigate(`create?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        },
    })

    return null
}

export default Map
