import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLocation as createLocationApi } from '../services/apiLocations'
import { useNavigate } from 'react-router-dom'
import useUrlPosition from '../hooks/useUrlPosition'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'

const showFileSize = (fileSize) => Math.round(fileSize / 1024)

function AddLocation() {
    const { isLoggedIn } = useContext(UserContext)
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    //Get coordinates from url search params
    const [lat, lng] = useUrlPosition()
    const [images, setImages] = useState([])
    const [imgRequiredError, setImgRequiredError] = useState(false)
    const [isFileSizeError, setIsFileSizeError] = useState(false)

    //HOOK FORM
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

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
        if (images.length === 0) {
            setImgRequiredError(true)
            return
        }
        if (isFileSizeError) return

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

    //Previewing images
    const onChangeFiles = (e) => {
        setImgRequiredError(false)
        if (e.target.files.length > 0) {
            const files = Array.from(e.target.files)
            const newImages = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }))

            setImages([...images, ...newImages])
        }
    }

    //Deleting images
    const removeImage = (index) => {
        const newImages = images.filter(
            (image) => images.indexOf(image) !== index
        )
        setImages(newImages)
    }

    //CHECKING IF ANY IMAGE EXCEEDS MAX SIZE
    useEffect(() => {
        images.forEach((image) => {
            if (Math.round(image.file.size / 1024) > 1024) {
                setIsFileSizeError(true)
            } else {
                setIsFileSizeError(false)
            }
        })
    }, [images])

    return (
        <>
            <div onClick={() => navigate(-1)}>Back</div>
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
                        className={`mt-2 h-7 w-full rounded border border-black px-3 ${imgRequiredError ? 'border-red-600' : ''}`}
                        onChange={onChangeFiles}
                    />
                    <p className="mt-2 text-red-600">
                        {imgRequiredError && 'Up to 5 images required'}
                        {isFileSizeError && 'Each image must be less than 1mb'}
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
                                        Size: {showFileSize(image.file.size)}Kb
                                    </div>
                                    <button onClick={() => removeImage(index)}>
                                        X
                                    </button>
                                </span>
                            )
                        })}
                    </div>
                </div>
                <Button
                    disabled={isFileSizeError}
                    primary
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {isLoading ? 'Loading...' : 'Add location'}
                </Button>
            </form>
        </>
    )
}

export default AddLocation
