import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useUrlPosition from './useUrlPosition.js'

function useCreateEditLocation(action) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    //Get coordinates from url search params
    const [lat, lng] = useUrlPosition()

    const { mutate, isPending, error } = useMutation({
        mutationKey: [action.name],
        mutationFn: action,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['coord'] })
            navigate(`/location/${data}?lat=${lat}&lng=${lng}`)
        },
        onError: (error) => {
            console.log(error)
            //TODO Handle errors
        },
    })

    return { mutate, isPending, error, lat, lng }
}

export default useCreateEditLocation
