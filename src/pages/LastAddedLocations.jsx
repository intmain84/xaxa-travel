import LocationItem from '../components/LocationItem'
import useGetLatestLocations from '../hooks/useGetLatestLocations'

const LastAddedLocations = () => {
    const { data, isPending, error } = useGetLatestLocations()

    return (
        <div className="mx-4 mb-4">
            {isPending && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && data.length > 0 && (
                <ul className="grid grid-cols-3 gap-4">
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
