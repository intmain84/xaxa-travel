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

function AddLocation() {
    const { isLoggedIn, setNewPlaceName } = useContext(Context)

    //Images data
    const [images, setImages] = useState([])
    const [imgRequiredError, setImgRequiredError] = useState(false)
    const [isFileSizeError, setIsFileSizeError] = useState(false)
    const navigate = useNavigate()

    //HOOK FORM
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    //CREATE LOCATION
    const {
        mutate,
        isPending: isCreatingLocation,
        error: createError,
        lat,
        lng,
    } = useCreateEditLocation(createLocation)

    //Calling API function
    const onSubmit = (data) => {
        if (isFileSizeError || imgRequiredError) return

        const newImages = images.map((image) => image.file)

        data = {
            ...data,
            lat: Number(lat),
            lng: Number(lng),
            user_id: isLoggedIn,
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

    if (isCreatingLocation) return <div>LOADINGGGGGG</div>

    if (!isCreatingLocation)
        return (
            <div className="mx-4 mt-9 rounded-lg bg-toxic-green p-5 text-dark-green">
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
                            className={`mt-2 h-7 w-full rounded border border-light-green px-3 outline-lighter-green transition-all duration-300 ${errors?.name?.message ? 'border-light-red' : ''}`}
                            onChange={(e) => setNewPlaceName(e.target.value)}
                        />
                        <p className="mt-2 text-light-red">
                            {errors?.name?.message}
                        </p>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mb-4">
                        <label htmlFor="description" className="font-bold">
                            Description
                        </label>
                        <textarea
                            rows="8"
                            disabled={isCreatingLocation}
                            id="description"
                            {...register('description', {
                                required: 'This field is required',
                            })}
                            className={`mt-2 w-full rounded border border-light-green px-3 outline-lighter-green ${errors?.description?.message ? 'border-light-red' : ''}`}
                        />
                        <p className="mt-2 text-light-red">
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
                            <p className="mt-2 text-light-red">
                                Up to 4 images required
                            </p>
                        )}
                        {isFileSizeError && (
                            <p className="mt-2 text-light-red">
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
                                            className={`${showFileSize(image.file.size) > 1024 ? 'font-semibold text-light-red' : ''}`}
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
                        <Button secondary onClick={() => navigate('/')}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        )
}

export default AddLocation
