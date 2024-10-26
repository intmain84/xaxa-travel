import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    editLocation as editLocationApi,
    getLocation,
} from '../services/apiLocations'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

function EditLocation() {
    const queryClient = useQueryClient()
    const { id } = useParams()
    const navigate = useNavigate()
    let sumFiles = 0

    const [images, setImages] = useState([])

    const {
        data: oldData,
        isPending: isGettingData,
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
        isPending: isUpdatingData,
        error: errorEdit,
    } = useMutation({
        mutationFn: editLocationApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['coord'] })
            navigate(`/location/${data.id}?lat=${data.lat}&lng=${data.lng}`)
        },
        onError: (errorEdit) => {
            console.log(errorEdit)
        },
    })

    const onSubmit = (data) => {
        editLocation({ ...data, id })
    }

    //Previewing images
    const onChangeFiles = (e) => {
        if (e.target.files.length > 0) {
            const images = Array.from(e.target.files)
            const newImages = images.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }))

            setImages(() => newImages)
        }
    }

    if (!isGettingData) {
        sumFiles = oldData.images.length + images.length
        console.log(sumFiles)
    }

    if (isUpdatingData || isGettingData) return <div>LoADinG...</div>

    if (!isUpdatingData || !isGettingData)
        return (
            <>
                <div className="flex gap-3">
                    {oldData.images.length > 0 &&
                        oldData.images.map((image) => (
                            <img
                                key={image.id}
                                src={image.image_link}
                                alt=""
                                className="w-15"
                            />
                        ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="font-bold">
                            Name
                        </label>
                        <input
                            disabled={isUpdatingData}
                            id="name"
                            type="text"
                            defaultValue={oldData?.name}
                            {...register('name', {
                                required: 'This field is required',
                            })}
                            className={`mt-2 h-7 w-full rounded border border-black px-3 ${errors?.description?.message && 'border-red-600'}`}
                        />
                        <p className="mt-2 text-red-600">
                            {errors?.name?.message}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="font-bold">
                            Description
                        </label>
                        <input
                            disabled={isUpdatingData}
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
                    {/* IMAGES UPLOAD */}
                    <div className="mb-4">
                        <label htmlFor="images" className="font-bold">
                            Photos
                        </label>
                        <input
                            id="images"
                            type="file"
                            accept="image/*"
                            multiple
                            {...register('images')}
                            className={`mt-2 h-7 w-full rounded border border-black px-3 ${errors?.images?.message ? 'border-red-600' : ''}`}
                            onChange={onChangeFiles}
                        />
                        <p className="mt-2 text-red-600">
                            {errors?.images?.message}
                        </p>
                        <div className="mt-3 flex gap-2">
                            {images.map((image, index) => {
                                return (
                                    <span key={index} className="w-14">
                                        <img
                                            src={image.preview}
                                            alt=""
                                            className="w-full"
                                        />
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {sumFiles <= 5 && (
                            <Button primary onSubmit={handleSubmit(onSubmit)}>
                                Add location
                            </Button>
                        )}
                        <Button secondary onSubmit={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </>
        )
}

export default EditLocation
