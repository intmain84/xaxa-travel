import { useQuery } from '@tanstack/react-query'
import { getLatestLocations } from '../services/apiLocations'

function useGetLatestLocations() {
    const { data, isPending, error } = useQuery({
        queryKey: ['latestLocations'],
        queryFn: () => getLatestLocations(),
    })
    return { data, isPending, error }
}

export default useGetLatestLocations
