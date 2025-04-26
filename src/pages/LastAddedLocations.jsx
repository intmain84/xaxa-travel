import LocationItem from '../components/LocationItem'
import useGetLatestLocations from '../hooks/useGetLatestLocations'
import { showDateTime } from '../utilities/formatDateTime'

const LastAddedLocations = () => {
    //TODO Need to display a list of the last 10 added locations here
    const { data, isPending, error } = useGetLatestLocations()

    return (
        <div>
            <h1>Latest Locations</h1>
            {isPending && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && data.length > 0 && (
                <ul>
                    {data.map((location) => {
                        return (
                            <LocationItem
                                key={location.id}
                                location={location}
                            />
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default LastAddedLocations
