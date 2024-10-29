import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    editLocation as editLocationApi,
    getLocation,
} from '../services/apiLocations'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import usePreviewFiles from '../hooks/usePreviewFiles.js'

const showFileSize = (fileSize) => Math.round(fileSize / 1024)

function EditLocation() {
    const queryClient = useQueryClient()
    const { id } = useParams()
    const navigate = useNavigate()

    //Images data
    const [images, setImages] = useState([])
    const [imgRequiredError, setImgRequiredError] = useState(false)
    const [isFileSizeError, setIsFileSizeError] = useState(false)

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

    // TODO TO PUT THE CODE BELOW A CUSTOM HOOK (SIMILAR TO ADDLOCATION)
    //MUTATION
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

    //Calling API function
    const onSubmit = (data) => {
        if (images.length === 0) {
            setImgRequiredError(true)
            return
        }
        if (isFileSizeError) return

        const newImages = images.map((image) => image.file)

        data = {
            ...data,
            images: newImages,
            id,
        }
        editLocation(data)
    }

    const { onChangeFiles, removeImage } = usePreviewFiles(
        images,
        setImages,
        setImgRequiredError,
        setIsFileSizeError
    )

    if (isUpdatingData || isGettingData) return <div>LoADinG...</div>

    if (!isUpdatingData || !isGettingData)
        return (
            <>
                <h1>Editing location</h1>
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
                            className={`mt-2 h-7 w-full rounded border border-black px-3 ${imgRequiredError || isFileSizeError ? 'border-red-600' : ''}`}
                            onChange={onChangeFiles}
                        />
                        <p className="mt-2 text-red-600">
                            {imgRequiredError && 'Up to 5 images required'}
                            {isFileSizeError &&
                                'Each image must be less than 1mb'}
                        </p>
                        <div className="mt-3 flex flex-col gap-2">
                            {images.map((image, index) => {
                                return (
                                    <span
                                        key={index}
                                        className="relative flex gap-3"
                                    >
                                        <img
                                            src={image.preview}
                                            alt=""
                                            className="aspect-video w-7 object-cover"
                                        />
                                        <div
                                            className={`${showFileSize(image.file.size) > 1024 ? 'font-semibold text-red-600' : ''}`}
                                        >
                                            Size:{' '}
                                            {showFileSize(image.file.size)}Kb
                                        </div>
                                        <button
                                            onClick={() => removeImage(index)}
                                        >
                                            X
                                        </button>
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button primary onSubmit={handleSubmit(onSubmit)}>
                            Add location
                        </Button>
                        <Button secondary onClick={() => navigate('/profile')}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </>
        )
}

export default EditLocation
