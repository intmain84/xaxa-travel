import { useParams } from 'react-router-dom'
import SpinnerFull from '../components/SpinnerFull.jsx'
import Button from '../components/Button.jsx'
import useGetLocation from '../hooks/useGetLocation.js'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'

function Location() {
    const { id } = useParams()

    const { isLoggedIn } = useContext(UserContext)

    const { data: location, isPending, error } = useGetLocation(id)

    //ERROR
    if (error && !isPending) return <div>{error.message}</div>

    //LOADING
    if (isPending && !error) return <SpinnerFull />

    //DATA
    if (!isPending && !error) {
        return (
            <>
                <div>Location: {location.name}</div>
                <div>Description: {location.description}</div>
                <div>Added by Alexey</div>
                {isLoggedIn === location.user_uuid && (
                    <Button secondary to={`/location/${id}/edit`}>
                        Edit
                    </Button>
                )}
            </>
        )
    }
}

export default Location
