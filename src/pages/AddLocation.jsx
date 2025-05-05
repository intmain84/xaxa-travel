import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { createLocation } from '../services/apiLocations'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../context/Context.jsx'
import usePreviewFiles from '../hooks/usePreviewFiles.js'
import useCreateEditLocation from '../hooks/useCreateEditLocation.js'
import showFileSize from '../utilities/showFileSize.js'
import { useNavigate } from 'react-router-dom'
import useGetAddress from '../hooks/useGetAddress.js'
import { useEffect } from 'react'

function AddLocation() {
    const { session, setNewPlaceName } = useContext(Context)

    //Images data
    const [images, setImages] = useState([])
    const [imgRequiredError, setImgRequiredError] = useState(false)
    const [isFileSizeError, setIsFileSizeError] = useState(false)
    const navigate = useNavigate()

    //HOOK FORM
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: { location: '' } })

    //CREATE LOCATION
    const {
        mutate,
        isPending: isCreatingLocation,
        error: createError,
        lat,
        lng,
    } = useCreateEditLocation(createLocation)

    const {
        address,
        loading: loadingAddress,
        error: getAddressError,
    } = useGetAddress(lat, lng)

    //Calling API function
    const onSubmit = (data) => {
        if (isFileSizeError || imgRequiredError) return

        const newImages = images.map((image) => image.file)

        data = {
            ...data,
            lat: Number(lat),
            lng: Number(lng),
            user_id: session.user.id,
            images: newImages,
        }
        mutate(data)
    }

    const { onChangeFiles, removeImage } = usePreviewFiles(
        images,
        setImages,
        setImgRequiredError,
        setIsFileSizeError
    )

    useEffect(() => {
        if (address) {
            reset({ location: address })
        }
    }, [address, reset])

    if (isCreatingLocation) return <div>LOADINGGGGGG</div>

    if (!isCreatingLocation)
        return (
            <div className="bg-toxic-green text-dark-green mx-4 mt-9 rounded-lg p-5">
                <h1>Adding location</h1>
                <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* NAME */}
                    <div className="mb-4">
                        <label htmlFor="name" className="font-bold">
                            Name
                        </label>
                        <input
                            disabled={isCreatingLocation}
                            id="name"
                            type="text"
                            {...register('name', {
                                required: 'This field is required',
                            })}
                            className={`border-light-green outline-lighter-green mt-2 h-7 w-full rounded border px-3 transition-all duration-300 ${errors?.name?.message ? 'border-light-red' : ''}`}
                            onChange={(e) => setNewPlaceName(e.target.value)}
                        />
                        <p className="text-light-red mt-2">
                            {errors?.name?.message}
                        </p>
                    </div>

                    {/* PROJECT */}
                    <div className="mb-4">
                        <label htmlFor="project" className="font-bold">
                            Project
                        </label>
                        <input
                            disabled={isCreatingLocation}
                            id="project"
                            type="text"
                            {...register('project', {
                                required: 'This field is required',
                            })}
                            className={`border-light-green outline-lighter-green mt-2 h-7 w-full rounded border px-3 transition-all duration-300 ${errors?.project?.message ? 'border-light-red' : ''}`}
                        />
                        <p className="text-light-red mt-2">
                            {errors?.project?.message}
                        </p>
                    </div>

                    {/* ADDRESS */}
                    <div className="mb-4">
                        <label htmlFor="location" className="font-bold">
                            Location
                        </label>
                        <input
                            disabled={isCreatingLocation}
                            id="location"
                            type="text"
                            defaultValue={address}
                            {...register('location', {
                                required: 'This field is required',
                            })}
                            className={`border-light-green outline-lighter-green mt-2 h-7 w-full rounded border px-3 transition-all duration-300 ${errors?.location?.message ? 'border-light-red' : ''}`}
                        />
                        <p className="text-light-red mt-2">
                            {errors?.location?.message}
                        </p>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mb-4">
                        <label htmlFor="description" className="font-bold">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            disabled={isCreatingLocation}
                            id="description"
                            {...register('description', {
                                required: 'This field is required',
                            })}
                            className={`border-light-green outline-lighter-green mt-2 w-full rounded border px-3 ${errors?.description?.message ? 'border-light-red' : ''}`}
                        />
                        <p className="text-light-red mt-2">
                            {errors?.description?.message}
                        </p>
                    </div>

                    {/* IMAGES UPLOAD */}
                    <div className="mb-4">
                        <label htmlFor="images" className="font-bold">
                            Photos
                        </label>
                        <input
                            disabled={isCreatingLocation}
                            id="images"
                            type="file"
                            accept="image/*"
                            multiple
                            className={`mt-2 h-7 w-full rounded border border-black px-3 ${imgRequiredError || isFileSizeError ? 'border-light-red' : ''}`}
                            onChange={onChangeFiles}
                        />
                        {imgRequiredError && (
                            <p className="text-light-red mt-2">
                                Up to 2 images required
                            </p>
                        )}
                        {isFileSizeError && (
                            <p className="text-light-red mt-2">
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
                                            className={`${showFileSize(image.file.size) > 1024 ? 'text-light-red font-semibold' : ''}`}
                                        >
                                            Size:{' '}
                                            {showFileSize(image.file.size)}
                                            Kb
                                        </div>
                                        <span
                                            onClick={() => removeImage(index)}
                                        >
                                            X
                                        </span>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between gap-3">
                        <Button primary onSubmit={handleSubmit(onSubmit)}>
                            {isCreatingLocation ? 'Loading...' : 'Add location'}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        )
}

export default AddLocation
