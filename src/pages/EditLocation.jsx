import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    editLocation as editLocationApi,
    getLocation,
} from '../services/apiLocations'
import { useNavigate, useParams } from 'react-router-dom'

function EditLocation() {
    const queryClient = useQueryClient()
    const { id } = useParams()
    const navigate = useNavigate()

    const {
        data: oldData,
        isPending,
        error,
    } = useQuery({
        queryKey: ['location', id],
        queryFn: () => getLocation(id),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const {
        data,
        mutate: editLocation,
        isLoading,
    } = useMutation({
        mutationFn: editLocationApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['coord'] })
            navigate(`/location/${data}`)
        },
    })

    const onSubmit = (data) => {
        data = { ...data, lat: Number(lat), lng: Number(lng) }
        // editLocation(data)
        return null
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            EDIT
            <div className="mb-4">
                <label htmlFor="name" className="font-bold">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    defaultValue={oldData?.name}
                    {...register('name', {
                        required: 'This field is required',
                    })}
                    className={`mt-2 h-7 w-full rounded border border-black px-3 ${errors?.description?.message && 'border-red-600'}`}
                />
                <p className="mt-2 text-red-600">{errors?.name?.message}</p>
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="font-bold">
                    Description
                </label>
                <input
                    id="description"
                    type="text"
                    defaultValue={oldData?.description}
                    {...register('description', {
                        required: 'This field is required',
                    })}
                    className={`mt-2 h-7 w-full rounded border border-black px-3 ${errors?.description?.message && 'border-red-600'}`}
                />
                <p className="mt-2 text-red-600">
                    {errors?.description?.message}
                </p>
            </div>
            <Button primary onSubmit={handleSubmit(onSubmit)}>
                Add location
            </Button>
        </form>
    )
}

export default EditLocation
