import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLocation as createLocationApi } from '../services/apiLocations'
import { useNavigate } from 'react-router-dom'
import useUrlPosition from '../hooks/useUrlPosition'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import usePreviewFiles from '../hooks/usePreviewFiles.js'

const showFileSize = (fileSize) => Math.round(fileSize / 1024)

function AddLocation() {
    const { isLoggedIn } = useContext(UserContext)
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    //Get coordinates from url search params
    const [lat, lng] = useUrlPosition()

    //Images data
    const [images, setImages] = useState([])
    const [imgRequiredError, setImgRequiredError] = useState(false)
    const [isFileSizeError, setIsFileSizeError] = useState(false)

    //HOOK FORM
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // TODO TO PUT THE CODE BELOW A CUSTOM HOOK (SIMILAR TO EDITLOCATION)
    //MUTATION
    const {
        data,
        mutate: createLocation,
        isLoading,
    } = useMutation({
        mutationFn: createLocationApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['coord'] })
            navigate(`/location/${data}?lat=${lat}&lng=${lng}`)
        },
        onError: (error) => {
            console.log(error)
            //Отработать тут ошибки
        },
    })

    //Calling API function
    const onSubmit = (data) => {
        if (imgRequiredError || isFileSizeError) return

        const newImages = images.map((image) => image.file)

        data = {
            ...data,
            lat: Number(lat),
            lng: Number(lng),
            user_id: isLoggedIn,
            images: newImages,
        }
        createLocation(data)
    }

    const { onChangeFiles, removeImage } = usePreviewFiles(
        images,
        setImages,
        setImgRequiredError,
        setIsFileSizeError
    )

    return (
        <>
            <h1>Adding location</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* NAME */}
                <div className="mb-4">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <input
                        disabled={isLoading}
                        id="name"
                        type="text"
                        {...register('name', {
                            required: 'This field is required',
                        })}
                        className={`mt-2 h-7 w-full rounded border border-black px-3 ${errors?.name?.message ? 'border-red-600' : ''}`}
                    />
                    <p className="mt-2 text-red-600">{errors?.name?.message}</p>
                </div>

                {/* DESCRIPTION */}
                <div className="mb-4">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <input
                        disabled={isLoading}
                        id="description"
                        type="text"
                        {...register('description', {
                            required: 'This field is required',
                        })}
                        className={`mt-2 h-7 w-full rounded border border-black px-3 ${errors?.description?.message ? 'border-red-600' : ''}`}
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
                        disabled={isLoading}
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        className={`mt-2 h-7 w-full rounded border border-black px-3 ${imgRequiredError || isFileSizeError ? 'border-red-600' : ''}`}
                        onChange={onChangeFiles}
                    />
                    {imgRequiredError && (
                        <p className="mt-2 text-red-600">
                            Up to 5 images required
                        </p>
                    )}
                    {isFileSizeError && (
                        <p className="mt-2 text-red-600">
                            Each image must be less than 1mb
                        </p>
                    )}
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
                                        Size: {showFileSize(image.file.size)}Kb
                                    </div>
                                    <span onClick={() => removeImage(index)}>
                                        X
                                    </span>
                                </span>
                            )
                        })}
                    </div>
                </div>
                <Button primary onSubmit={handleSubmit(onSubmit)}>
                    {isLoading ? 'Loading...' : 'Add location'}
                </Button>
            </form>
        </>
    )
}

export default AddLocation
