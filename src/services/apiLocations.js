import supabase from './supabase'
import createImagesData from '../utilities/createImagesData.js'
import createImagesRows from '../utilities/createImagesRows.js'

//GET MARKERS
export async function getCoordinates() {
    const { data, error } = await supabase
        .from('locations')
        .select('id, name, lat, lng')

    if (error) console.log(error.message)

    return data
}

//GET LOCATION
export async function getLocation(id) {
    let { data, error } = await supabase
        .from('locations')
        .select(
            `
          *, 
          profiles ( avatar_url, full_name ),
          images (id, image_link)
    `
        )
        .eq('id', id)

    if (data.length === 0) throw new Error('No location found')

    if (error) throw new Error(error.message)

    const location = data[0]

    return location
}

//GET USER'S LOCATIONS
export async function getUserLocations(user_id) {
    let { data, error } = await supabase
        .from('locations')
        .select(
            `
          *,
          images (id, image_link)
        `
        )
        .eq('user_id', user_id)

    if (data.length === 0)
        throw new Error("You haven't added any locations yet")

    if (error) throw new Error('error.message')

    return data
}

//GET LATEST LOCATIONS
export async function getLatestLocations() {
    let { data, error } = await supabase
        .from('locations')
        .select(
            `*,
          images (id, image_link)`
        )
        .limit(10)

    if (data.length === 0)
        throw new Error("You haven't added any locations yet")

    if (error) throw new Error("Couldn't get latest locations")

    return data
}

//CREATE LOCATION
export async function createLocation(newLocation) {
    const { images, ...location } = newLocation

    //1) INSERT LOCATION AND GETTING ITS ID
    const { data: locationFromDB, error: locationError } = await supabase
        .from('locations')
        .insert([location])
        .select()

    if (locationError)
        throw new Error(
            '(insert locations) Location could not be created. Try again'
        )

    const { id: locationId } = locationFromDB[0]

    //2) CREATING IMAGE PATHS
    const imagesData = createImagesData(images)

    //3) INSERTING IMAGES
    const imageRows = createImagesRows(imagesData, locationId)

    const { error: imagesError } = await supabase
        .from('images')
        .insert(imageRows)
        .select()
    if (imagesError) {
        throw new Error(
            '(insert images) Location could not be created. Try again'
        )
    }

    //4) UPLOADING IMAGES TO STORAGE
    for (const image of imagesData) {
        let { error: storageError } = await supabase.storage
            .from('locations')
            .upload(image.imageName, image.file)
        if (storageError) {
            throw new Error(
                '(Upload images) Location could not be created. Try again'
            )
        }
    }
    return locationId
}

//EDIT LOCATION
export async function editLocation(newData) {
    const { id: locationId, images, readyToRemove, ...sendData } = newData
    const { error: locationError } = await supabase
        .from('locations')
        .update(sendData)
        .eq('id', locationId)

    if (locationError)
        throw new Error(
            '(edit locations) Location could not be edited. Try again'
        )

    // IF THERE'S ANY NEW IMAGE TO UPLOAD
    if (images.length > 0) {
        //2) CREATING IMAGE PATHS
        const imagesData = createImagesData(images)

        //3) INSERTING IMAGES
        const imageRows = createImagesRows(imagesData, locationId)

        const { error: imagesError } = await supabase
            .from('images')
            .insert(imageRows)
            .select()
        if (imagesError) {
            throw new Error(
                '(edit images) Images cant be inserted to table. Try again'
            )
        }

        //4) UPLOADING IMAGES TO STORAGE
        for (const image of imagesData) {
            let { error: storageError } = await supabase.storage
                .from('locations')
                .upload(image.imageName, image.file)
            if (storageError) {
                throw new Error(
                    '(Upload images) Location could not be created. Try again'
                )
            }
        }
    }

    // IF THERE'S ANY IMAGE TO DELETE
    if (readyToRemove.length > 0) {
        //Filling array with file names (e.g. ['image1.jpg', 'image2.png'])
        const imageNames = readyToRemove.map((image) =>
            image.image_link.split('/').pop()
        )

        //Delete images from storage
        const { error: storageError } = await supabase.storage
            .from('locations')
            .remove(imageNames)
        if (storageError) {
            throw new Error('ERROR delete from storage. Try again')
        }

        //Filling array with file IDs (e.g. [1, 2, 3])
        const imageIds = readyToRemove.map((image) => image.id)

        //Delete records from images tables
        const { error: errorDeleteImagesRows } = await supabase
            .from('images')
            .delete()
            .in('id', imageIds)
        if (errorDeleteImagesRows)
            throw new Error(errorDeleteImagesRows.message)
    }

    return locationId
}

//DELETE LOCATION
export async function deleteLocationApi(location) {
    const { id, images } = location

    //Filling array with file names (e.g. ['image1.jpg', 'image2.png'])
    const imageNames = images.map((image) => image.image_link.split('/').pop())

    //Delete images from storage
    const { error: storageError } = await supabase.storage
        .from('locations')
        .remove(imageNames)
    if (storageError) {
        throw new Error('Location could not be deleted. Try again')
    }

    //Delete records from locations and images tables
    const { error: locationDeleteError } = await supabase
        .from('locations')
        .delete()
        .eq('id', id)
    if (locationDeleteError)
        throw new Error('Location could not be deleted. Try again')
}
