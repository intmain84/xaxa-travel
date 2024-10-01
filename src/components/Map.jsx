import { useQuery } from '@tanstack/react-query'
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from 'react-leaflet'
import { getCoordinates } from '../services/apiLocations'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
                {!isFetching &&
                    coord.map((pos) => (
                        <Marker key={pos.id} position={[pos.lat, pos.lng]}>
                            <Popup>{pos.name}</Popup>
                        </Marker>
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
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        },
    })

    return null
}

export default Map
