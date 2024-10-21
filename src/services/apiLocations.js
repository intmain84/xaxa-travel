import supabase, { supabaseUrl } from './supabase'
import logo from '../components/Logo.jsx'

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

    if (error) throw new Error(error.message)

    return data
}

//CREATE LOCATION
export async function createLocation(newLocation) {
    const { images, ...location } = newLocation

    try {
        //1) INSERT LOCATION AND GETTING ITS ID
        const { data: locationFromDB, error: locationError } = await supabase
            .from('locations')
            .insert([location])
            .select()

        if (locationError) throw locationError
        const { id: locationId } = locationFromDB[0]

        //2) CREATING IMAGE PATHS
        let imagesData = []
        Array.from(images).forEach((file) => {
            const name = file.name.replaceAll('/', '').replaceAll(' ', '')
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
            throw imagesError
        }

        // //4) UPLOADING IMAGES TI STORAGE
        for (const image of imagesData) {
            let { data, error: storageError } = await supabase.storage
                .from('locations')
                .upload(image.imageName, image.file)

            if (storageError) {
                throw storageError
            }
        }

        return locationId
    } catch (error) {
        throw error
        //Отработать тут ошибки
    }
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

    const { id } = data[0]

    return id
}

//DELETE LOCATION
export async function deleteLocationApi(id) {
    const { error } = await supabase.from('locations').delete().eq('id', id)

    if (error) throw new Error(error.message)
}
