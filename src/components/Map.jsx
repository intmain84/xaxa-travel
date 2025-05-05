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
import { Satellite, Map as MapIcon } from 'lucide-react'

const mapTypes = {
    default: {
        url: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}',
        attribution:
            '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png',
    },
    satellite: {
        url: 'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}',
        attribution:
            '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'jpg',
    },
}

function Map() {
    const location = useLocation()
    const { pathname } = location

    const { newPlaceName } = useContext(Context)
    const [mapPosition, setMapPosition] = useState([
        49.35375571830993, 23.510742187500004,
    ])
    const [isDefaultMap, setIsDefaultMap] = useState(true)

    const {
        data: coord,
        isFetching,
        error,
    } = useQuery({ queryKey: ['coord'], queryFn: getCoordinates })

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
        <div>
            {/* Map */}
            <MapContainer
                center={[mapLat, mapLng]}
                zoom={5}
                style={{ height: '100%' }}
            >
                {/* Layers switcher */}
                <LayerSwitcher
                    isDefaultMap={isDefaultMap}
                    setIsDefaultMap={setIsDefaultMap}
                    setMapPosition={setMapPosition}
                />
                <TileLayer
                    url={
                        isDefaultMap
                            ? mapTypes.default.url
                            : mapTypes.satellite.url
                    }
                    attribution={
                        isDefaultMap
                            ? mapTypes.default.attribution
                            : mapTypes.satellite.attribution
                    }
                    ext={
                        isDefaultMap
                            ? mapTypes.default.ext
                            : mapTypes.satellite.ext
                    }
                />
                {/* Markers */}
                {mapLat && mapLng && pathname == '/create' && (
                    <MyMarker position={[mapLat, mapLng]}>
                        <Tooltip permanent>{newPlaceName}</Tooltip>
                    </MyMarker>
                )}

                {!isFetching &&
                    coord.map((pos) => (
                        <MyMarker id={pos.id} position={[pos.lat, pos.lng]}>
                            <Tooltip
                                direction="top"
                                offset={[-13, -15]}
                                className="marker-tooltip"
                            >
                                {pos.name}
                            </Tooltip>
                        </MyMarker>
                    ))}
                <ClickNewLocation />
                <NewCenter position={mapPosition} />
            </MapContainer>
        </div>
    )
}

// LayerSwitcher component
function LayerSwitcher({ isDefaultMap, setIsDefaultMap, setMapPosition }) {
    const map = useMap() // Получаем карту для контекста
    const handleLayerChange = (e) => {
        if (e.currentTarget.id === 'layer-switcher') {
            const currentMapCenter = map.getCenter() // Получаем текущий центр карты
            setMapPosition([currentMapCenter.lat, currentMapCenter.lng]) // Обновляем состояние с новым центром карты
            setIsDefaultMap((prev) => !prev)
        }
    }

    return (
        <button
            id="layer-switcher"
            onClick={handleLayerChange}
            className="absolute right-3 top-4 z-[1000] cursor-pointer rounded-sm border-2 border-gray-300 bg-white p-3"
        >
            {isDefaultMap ? (
                <Satellite size={18} strokeWidth={2} />
            ) : (
                <MapIcon size={18} strokeWidth={2} />
            )}
        </button>
    )
}

function NewCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
}

function ClickNewLocation() {
    const { setNewPlaceName, session } = useContext(Context)
    const navigate = useNavigate()

    useMapEvents({
        click: (e) => {
            if (session) {
                const target = e.originalEvent.target
                if (e.originalEvent.target.closest('#layer-switcher')) return
                setNewPlaceName('New location')
                navigate(`create?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
            }
        },
    })

    return null
}

export default Map
