import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getLocation } from '../services/apiLocations.js'
import SpinnerFull from '../components/SpinnerFull.jsx'
import Button from '../components/Button.jsx'

function Location() {
    const { id } = useParams()
    const { data, isPending, error } = useQuery({
        queryKey: ['location', id],
        queryFn: () => getLocation(id),
    })

    //ERROR
    if (error && !isPending) return <div>{error.message}</div>

    //LOADING
    if (isPending && !error) return <SpinnerFull />

    //DATA
    if (!isPending && !error)
        return (
            <>
                <div>Location: {data.name}</div>
                <div>Description: {data.description}</div>
                <div>Added by Alexey</div>
                <Button to={`/location/${id}/edit`}>Edit</Button>
            </>
        )
}

export default Location
