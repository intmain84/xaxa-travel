import { useQuery } from '@tanstack/react-query'

function useUser() {
    const {
        data: user,
        error,
        isPending,
    } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser,
    })

    return { user, error, isPending }
}

export default useUser
