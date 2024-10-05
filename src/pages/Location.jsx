import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getLocation } from '../services/apiLocations.js'
import SpinnerFull from '../components/SpinnerFull.jsx'
import Button from '../components/Button.jsx'
import useGetLocation from '../hooks/useGetLocation.js'

function Location() {
    const { id } = useParams()

    const { data: location, isPending, error } = useGetLocation(id)

    //ERROR
    if (error && !isPending) return <div>{error.message}</div>

    //LOADING
    if (isPending && !error) return <SpinnerFull />

    //DATA
    if (!isPending && !error)
        return (
            <>
                <div>Location: {location.name}</div>
                <div>Description: {location.description}</div>
                <div>Added by Alexey</div>
                <Button secondary to={`/location/${id}/edit`}>
                    Edit
                </Button>
            </>
        )
}

export default Location
