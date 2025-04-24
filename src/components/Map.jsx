import { useQuery } from '@tanstack/react-query'
import {
    MapContainer,
    TileLayer,
    Tooltip,
    useMap,
    useMapEvents,
} from 'react-leaflet'
import { getCoordinates } from '../services/apiLocations'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MyMarker from './MyMarker'
import { useGeolocation } from '../hooks/useGeolocation'
import useUrlPosition from '../hooks/useUrlPosition'
import { Context } from '../context/Context'

function Map() {
    const location = useLocation()
    const { pathname } = location

    const { newPlaceName } = useContext(Context)
    const [mapPosition, setMapPosition] = useState([
        49.35375571830993, 23.510742187500004,
    ])

    const {
        data: coord,
        isFetching,
        error,
    } = useQuery({
        queryKey: ['coord'],
        queryFn: getCoordinates,
    })

    const { getPosition, position } = useGeolocation()

    const [mapLat, mapLng] = useUrlPosition()

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    useEffect(() => {
        getPosition()
    }, [])

    useEffect(() => {
        if (position) setMapPosition([position.lat, position.lng])
    }, [position])

    return (
        <div className="overflow-hidden">
            <MapContainer center={mapPosition} zoom={5}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {mapLat && mapLng && pathname == '/create' && (
                    <MyMarker position={[mapLat, mapLng]}>
                        <Tooltip permanent>{newPlaceName}</Tooltip>
                    </MyMarker>
                )}
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
    const { setNewPlaceName } = useContext(Context)
    const navigate = useNavigate()
    const map = useMapEvents({
        click: (e) => {
            setNewPlaceName('New location')
            navigate(`create?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        },
    })

    return null
}

export default Map
