import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLocation as createLocationApi } from '../services/apiLocations'
import { useNavigate, useSearchParams } from 'react-router-dom'

function AddLocation() {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const {
        data,
        mutate: createLocation,
        isLoading,
    } = useMutation({
        mutationFn: createLocationApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['coord'] })
            navigate(`/location/${data}`)
        },
    })

    const onSubmit = (data) => {
        data = { ...data, lat: Number(lat), lng: Number(lng) }
        createLocation(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="name" className="font-bold">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
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

export default AddLocation