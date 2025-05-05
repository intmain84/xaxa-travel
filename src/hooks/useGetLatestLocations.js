import { useQuery } from '@tanstack/react-query'
import { getLatestLocations } from '../services/apiLocations'

function useGetLatestLocations() {
    const { data, error } = useQuery({
        queryKey: ['latestLocations'],
        queryFn: () => getLatestLocations(),
        suspense: true,
    })
    return { data, error }
}

export default useGetLatestLocations
