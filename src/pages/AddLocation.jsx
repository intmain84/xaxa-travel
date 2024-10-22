import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLocation as createLocationApi } from '../services/apiLocations'
import { useNavigate } from 'react-router-dom'
import useUrlPosition from '../hooks/useUrlPosition'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'

function AddLocation() {
    const { isLoggedIn } = useContext(UserContext)
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    //Get coordinates from url search params
    const [lat, lng] = useUrlPosition()
    const [images, setImages] = useState([])

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
        data = {
            ...data,
            lat: Number(lat),
            lng: Number(lng),
            user_id: isLoggedIn,
        }
        createLocation(data)
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

    return (
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
                    {...register('images', {
                        required: 'Add at least one image',
                    })}
                    className={`mt-2 h-7 w-full rounded border border-black px-3 ${errors?.images?.message ? 'border-red-600' : ''}`}
                    onChange={onChangeFiles}
                />
                <p className="mt-2 text-red-600">{errors?.images?.message}</p>
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
            <Button primary onSubmit={handleSubmit(onSubmit)}>
                {isLoading ? 'Loading...' : 'Add location'}
            </Button>
        </form>
    )
}

export default AddLocation
