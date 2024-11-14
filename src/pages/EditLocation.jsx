import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useQuery } from '@tanstack/react-query'
import { editLocation, getLocation } from '../services/apiLocations'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import usePreviewFiles from '../hooks/usePreviewFiles.js'
import useCreateEditLocation from '../hooks/useCreateEditLocation.js'
import showFileSize from '../utilities/showFileSize.js'

function EditLocation() {
    const { id } = useParams()
    const navigate = useNavigate()

    //Images data
    const [images, setImages] = useState([])
    const [readyToRemove, setReadyToRemove] = useState([])
    const [imgRequiredError, setImgRequiredError] = useState(false)
    const [isFileSizeError, setIsFileSizeError] = useState(false)

    const {
        data: oldData,
        isPending: isGettingLocation,
        error: editError,
    } = useQuery({
        queryKey: ['location', id],
        queryFn: () => getLocation(id),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    //EDIT LOCATION
    const {
        mutate,
        isPending: isUpdatingLocation,
        error: errorEditLocation,
    } = useCreateEditLocation(editLocation)

    //Calling API function
    const onSubmit = (data) => {
        if (isFileSizeError || imgRequiredError) return

        const newImages = images.map((image) => image.file)

        data = {
            ...data,
            images: newImages,
            id,
            readyToRemove,
        }
        mutate(data)
    }

    const { onChangeFiles, removeImage } = usePreviewFiles(
        images,
        setImages,
        setImgRequiredError,
        setIsFileSizeError,
        true, //if empty the parameter would be false
        oldData,
        readyToRemove
    )

    function setToRemoveImage(image) {
        setReadyToRemove((prev) => [...prev, image])
    }

    if (isUpdatingLocation || isGettingLocation) return <div>LoADinG...</div>

    if (!isUpdatingLocation || !isGettingLocation)
        return (
            <div className="mx-4 mt-9 rounded-lg bg-toxic-green p-5 text-dark-green">
                <h1 className="my-4">Editing location</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="font-bold">
                            Name
                        </label>
                        <input
                            disabled={isUpdatingLocation}
                            id="name"
                            type="text"
                            defaultValue={oldData?.name}
                            {...register('name', {
                                required: 'This field is required',
                            })}
                            className={`mt-2 h-7 w-full rounded border border-black px-3 ${errors?.description?.message && 'botext-light-red'}`}
                        />
                        <p className="text-light-red mt-2">
                            {errors?.name?.message}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="font-bold">
                            Description
                        </label>

                        <textarea
                            disabled={isUpdatingLocation}
                            id="description"
                            defaultValue={oldData?.description}
                            {...register('description', {
                                required: 'This field is required',
                            })}
                            className={`mt-2 h-7 w-full rounded border border-black px-3 ${errors?.description?.message && 'botext-light-red'}`}
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
                            id="images"
                            type="file"
                            accept="image/*"
                            multiple
                            className={`mt-2 h-7 w-full rounded border border-black px-3 ${imgRequiredError || isFileSizeError ? 'botext-light-red' : ''}`}
                            onChange={onChangeFiles}
                        />
                        {imgRequiredError && (
                            <p className="text-light-red mt-2">
                                Up to 5 images required
                            </p>
                        )}
                        {isFileSizeError && (
                            <p className="text-light-red mt-2">
                                Each image must be less than 1mb
                            </p>
                        )}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-3">
                        {oldData.images.map((image) => {
                            //If an image was deleted, its id added to readyToRemove. So
                            if (
                                readyToRemove.some(
                                    (remove) => remove.id === image.id
                                )
                            )
                                return
                            return (
                                <div
                                    key={image.id}
                                    className="w-[calc(25%-8px)]"
                                >
                                    <img
                                        src={image.image_link}
                                        alt=""
                                        className="aspect-video w-full object-cover"
                                    />
                                    <span className="text-sm">
                                        Uploaded earlier
                                    </span>
                                    <div
                                        onClick={() =>
                                            setToRemoveImage({
                                                id: image.id,
                                                image_link: image.image_link,
                                            })
                                        }
                                    >
                                        X
                                    </div>
                                </div>
                            )
                        })}
                        {images.map((image, index) => {
                            return (
                                <div key={index} className="w-[calc(25%-8px)]">
                                    <img
                                        src={image.preview}
                                        alt=""
                                        className="aspect-video w-full object-cover"
                                        key={index}
                                    />
                                    <span
                                        className={`text-sm ${showFileSize(image.file.size) > 1024 ? 'text-light-red font-semibold' : ''}`}
                                    >
                                        Size: {showFileSize(image.file.size)}Kb
                                    </span>
                                    <div onClick={() => removeImage(index)}>
                                        X
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-4 flex gap-3">
                        <Button primary onSubmit={handleSubmit(onSubmit)}>
                            Save
                        </Button>
                        <Button secondary onClick={() => navigate('/profile')}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        )
}

export default EditLocation
