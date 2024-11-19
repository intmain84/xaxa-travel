import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteLocationApi } from '../services/apiLocations.js'
import { useNavigate } from 'react-router-dom'

function useDeleteLocation(redirect = false) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {
        mutate: deleteLocation,
        isPending: isPendingDelete,
        error: errorDelete,
    } = useMutation({
        mutationFn: deleteLocationApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['userLocations'],
            })
            queryClient.invalidateQueries({
                queryKey: ['coord'],
            })
            if (redirect) navigate('/profile')
        },
        onError: (error) => {
            console.log(error)
            //Отработать тут ошибки
        },
    })

    return { deleteLocation, isPendingDelete, errorDelete }
}

export default useDeleteLocation
