import supabase, { supabaseUrl } from './supabase'

//GET MARKERS
export async function getCoordinates() {
    const { data, error } = await supabase
        .from('locations')
        .select('id, name, lat, lng')

    if (error) console.log(error)

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

//CREATE LOCATION
export async function createLocation(newLocation) {
    const { images, ...location } = newLocation

    //1) INSERT LOCATION AND GETTING ITS ID
    const { data: locationFromDB, error: locationError } = await supabase
        .from('locations')
        .insert([location])
        .select()

    if (locationError)
        throw new Error('Location could not be created. Try again')

    const { id: locationId } = locationFromDB[0]

    //2) CREATING IMAGE PATHS
    let imagesData = []
    Array.from(images).forEach((file) => {
        const name = file.name.replace(/[\/ _]/g, '')
        imagesData.push({
            imageName: name,
            path: `${supabaseUrl}/storage/v1/object/public/locations/${name}`,
            file,
        })
    })

    //3) INSERTING IMAGES
    let imageRows = []
    imagesData.forEach((data) => {
        imageRows.push({
            location_id: locationId,
            image_link: data.path,
        })
    })

    const { error: imagesError } = await supabase
        .from('images')
        .insert(imageRows)
        .select()
    if (imagesError) {
        //Delete records from locations and images tables
        const { error: locationDeleteError } = await supabase
            .from('locations')
            .delete()
            .eq('id', locationId)
        if (locationDeleteError)
            throw new Error('Location could not be deleted. Try again')

        throw new Error('Location could not be created. Try again')
    }

    // //4) UPLOADING IMAGES TI STORAGE
    for (const image of imagesData) {
        let { error: storageError } = await supabase.storage
            .from('locations')
            .upload(image.imageName, image.file)
        if (storageError) {
            //Delete records from locations and images tables
            const { error: locationDeleteError } = await supabase
                .from('locations')
                .delete()
                .eq('id', locationId)
            if (locationDeleteError)
                throw new Error('Location could not be deleted. Try again')

            throw new Error('Location could not be created. Try again')
        }
    }
    return locationId
}

//EDIT LOCATION
export async function editLocation(newData) {
    const { id: sendId, ...sendData } = newData
    const { data, error } = await supabase
        .from('locations')
        .update(sendData)
        .eq('id', sendId)
        .select()

    if (error) throw new Error(error.message)

    return data[0]
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
