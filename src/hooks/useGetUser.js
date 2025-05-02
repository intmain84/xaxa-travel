import { useQuery } from '@tanstack/react-query'
import { getUser } from '../services/apiUser'

function useGetUser(id) {
    const { data, isPending, error } = useQuery({
        queryKey: ['profiles', id],
        queryFn: () => getUser(id),
    })
    return { data, isPending, error }
}

export default useGetUser
