import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLocation as createLocationApi } from '../services/apiLocations'
import { useNavigate } from 'react-router-dom'
import useUrlPosition from '../hooks/useUrlPosition'
import { useState } from 'react'

function AddLocation() {
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    //Get coordinates from url search params
    const [lat, lng] = useUrlPosition()
    const [images, setImages] = useState([])
    const [imagesError, setImagesError] = useState(null)

    //HOOK FORM
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm()

    //MUTATION
    const {
        data: id,
        mutate: createLocation,
        isLoading,
    } = useMutation({
        mutationFn: createLocationApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['coord'] })
            navigate(`/location/${id}?lat=${lat}&lng=${lng}`)
        },
    })

    //Calling API function
    const onSubmit = (data) => {
        console.log('FROM SUBMIT', data)
        console.log('IMAGES', images)
        if (images.length === 0) {
            setImagesError('Add at least one image')
            return
        }

        const newImages = images.map((image) => image.file)

        data = {
            ...data,
            lat: Number(lat),
            lng: Number(lng),
            images: newImages,
        }
        createLocation(data)
    }

    //Previewing images
    const onChangeFiles = (e) => {
        if (e.target.files) {
            const images = Array.from(e.target.files)
            const newImages = images.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }))

            setImages(() => newImages)
        }
    }

    //Removing images
    const removeImage = (outerIndex) => {
        const newImages = images.filter((_, index) => index !== outerIndex)
        setImages(newImages)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
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
                    className={`mt-2 h-7 w-full rounded border border-black px-3 ${errors?.name?.message && 'border-red-600'}`}
                />
                <p className="mt-2 text-red-600">{errors?.name?.message}</p>
            </div>

            {/* DESCRIPTION */}
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
                    /*{...register('images', {required: 'This field is required',})}*/
                    className={`mt-2 h-7 w-full rounded border border-black px-3 ${imagesError ? 'border-red-600' : ''}`}
                    onChange={onChangeFiles}
                />
                <p className="mt-2 text-red-600">
                    {imagesError ? imagesError : ''}
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
                                <div onClick={() => removeImage(index)}>
                                    |X|
                                </div>
                            </span>
                        )
                    })}
                </div>
                <p className="mt-2 text-red-600">{errors?.file?.message}</p>
            </div>
            <Button primary onSubmit={handleSubmit(onSubmit)}>
                Add location
            </Button>
        </form>
    )
}

export default AddLocation
