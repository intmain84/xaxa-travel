import { useEffect } from 'react'

const usePreviewFiles = (
    images,
    setImages,
    setImgRequiredError,
    setIsFileSizeError
) => {
    const onChangeFiles = (e) => {
        setImgRequiredError(false)
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
        setImgRequiredError(images.length > 5)
    }, [images, setImgRequiredError, setIsFileSizeError])

    return { onChangeFiles, removeImage }
}

export default usePreviewFiles
