import { useQuery } from '@tanstack/react-query'
import { getLocation, getUserLocations } from '../services/apiLocations'

function useGetUserLocations(id) {
    const { data, isPending, error } = useQuery({
        queryKey: ['userLocations', id],
        queryFn: () => getUserLocations(id),
    })
    return { data, isPending, error }
}

export default useGetUserLocations
