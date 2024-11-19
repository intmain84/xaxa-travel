import { useEffect } from 'react'

const usePreviewFiles = (
    images,
    setImages,
    setImgRequiredError,
    setIsFileSizeError,
    edit = false,
    oldData,
    readyToRemove
) => {
    const onChangeFiles = (e) => {
        if (e.target.files.length > 0) {
            const files = Array.from(e.target.files)
            const newImages = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }))

            setImages((prevImages) => [...prevImages, ...newImages])
        }
    }

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index)
        setImages(newImages)
    }

    useEffect(() => {
        const ifSizeExceed = images.some(
            (image) => Math.round(image.file.size / 1024) > 1024
        )
        setIsFileSizeError(ifSizeExceed)

        // Check if image quantity exceeded
        if (edit) {
            //If edit === 'edit'
            setImgRequiredError(
                oldData?.images.length - readyToRemove.length + images.length >
                    4 ||
                    oldData?.images.length -
                        readyToRemove.length +
                        images.length ===
                        0
            )
        } else {
            setImgRequiredError(images.length > 4 || images.length === 0)
        }
    }, [
        images,
        edit,
        oldData,
        readyToRemove,
        setImgRequiredError,
        setIsFileSizeError,
    ])

    return { onChangeFiles, removeImage }
}

export default usePreviewFiles
