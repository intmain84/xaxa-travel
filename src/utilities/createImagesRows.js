// INSERTING IMAGES
function createImagesRows(imagesData, locationId) {
    let imageRows = []
    imagesData.forEach((data) => {
        imageRows.push({
            location_id: locationId,
            image_link: data.path,
        })
    })

    return imageRows
}

export default createImagesRows
