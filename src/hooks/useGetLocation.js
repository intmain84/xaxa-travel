import { useQuery } from '@tanstack/react-query'
import { getLocation } from '../services/apiLocations'

function useGetLocation(id) {
    const { data, isPending, error } = useQuery({
        queryKey: ['location', id],
        queryFn: () => getLocation(id),
    })
    return { data, isPending, error }
}

export default useGetLocation
