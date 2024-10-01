import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getLocation } from '../services/apiLocations.js'
import SpinnerFull from '../components/SpinnerFull.jsx'

function Location() {
    const { id } = useParams()
    const { data, isPending, error } = useQuery({
        queryKey: ['location', id],
        queryFn: () => getLocation(id),
    })

    if (isPending) return <SpinnerFull />

    if (!isPending && !error)
        return (
            <>
                <div>{data.name}</div>
                <div>{data.description}</div>
                <div>{data.lat}</div>
                <div>{data.lng}</div>
            </>
        )
}

export default Location
