import useGetUserLocations from '../hooks/useGetUserLocations.js'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import LocationItem from '../components/LocationItem.jsx'

function Profile() {
    const { isLoggedIn } = useContext(UserContext)
    const { data, isPending, error } = useGetUserLocations(isLoggedIn)

    if (error && !isPending) return <div>{error.message}</div>
    if (!error && isPending) return <div>Loading...</div>
    if (!error && !isPending)
        return (
            <div className="flex flex-col gap-5">
                {data?.map((location) => {
                    return (
                        <LocationItem key={location.id} location={location} />
                    )
                })}
            </div>
        )
}

export default Profile
