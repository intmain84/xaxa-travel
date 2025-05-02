import { useContext } from 'react'
import { Context } from '../context/Context.jsx'
import LocationItem from '../components/LocationItem.jsx'
import useGetUser from '../hooks/useGetUser.js'
import useGetUserLocations from '../hooks/useGetUserLocations.js'
import { useState } from 'react'
import { LocationEdit, Heart } from 'lucide-react'
import clsx from 'clsx'

function Profile() {
    const { session } = useContext(Context)
    const [activeTab, setActiveTab] = useState(0)

    const {
        data: user,
        isPending: userLoading,
        error: userError,
    } = useGetUser(session.user.id)

    const {
        data: locations,
        isPending: locationLoading,
        error: locationError,
    } = useGetUserLocations(session.user.id)

    if (locationError && !locationLoading)
        return <div>{locationError.message}</div>
    if (!locationError && locationLoading) return <div>Loading...</div>
    if (!locationError && !locationLoading)
        return (
            <div className="mt-4 flex-col gap-3 p-4">
                <div className="mb-6 flex items-center gap-5">
                    <img
                        src={user.avatar_url}
                        alt={user.full_name}
                        className="aspect-square h-12 w-12 rounded-full"
                    />
                    <h1 className="mb-2">
                        {user.username || user.full_name} profile
                    </h1>
                </div>
                <div className="mb-4 flex w-fit rounded-full bg-white p-2">
                    <button
                        onClick={() => setActiveTab(0)}
                        className={clsx(
                            'flex gap-3 rounded-full px-4 py-2 transition-all',
                            activeTab === 0 && 'bg-orange-300',
                            activeTab !== 0 && 'hover:bg-orange-200'
                        )}
                    >
                        <LocationEdit /> My locations
                    </button>
                    <button
                        onClick={() => setActiveTab(1)}
                        className={clsx(
                            'flex gap-3 rounded-full px-4 py-2 transition-all',
                            activeTab === 1 && 'bg-orange-300',
                            activeTab !== 1 && 'hover:bg-orange-200'
                        )}
                    >
                        <Heart /> Favorite locations
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {/* My locations */}
                    {locations?.map((location) => {
                        return (
                            <LocationItem
                                key={location.id}
                                location={location}
                            />
                        )
                    })}
                    {/* Favorite locations */}
                    {locations?.map((location) => {
                        return (
                            <LocationItem
                                key={location.id}
                                location={location}
                            />
                        )
                    })}
                </div>
            </div>
        )
}

export default Profile
