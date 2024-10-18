import supabase from './supabase'


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

    console.log(data[0])

    const location = data[0]

    return location
}

//CREATE LOCATION
export async function createLocation(newLocation) {

    const { images, ...location } = newLocation;

    //1) CREATING IMAGE PATHS

    //2) INSERT LOCATION AND GETTING ITS ID
    const { data: locationFromDB, error: locationError } = await supabase
        .from('locations')
        .insert([location])
        .select()
    if (locationError) throw new Error(locationError.message)
    const { locationId } = locationFromDB[0]

    //3) INSERTING IMAGES
    const { error: imagesError } = await supabase
        .from('images')
        .insert([
            { location_id: locationId, image_link: 'someValue' },
            { location_id: locationId, image_link: 'someValue' },
        ])
        .select()
    if (imagesError) {
        throw new Error(imagesError.message)

        return
    }

    //4) UPLOADING IMAGES TI STORAGE
    const { error: uploadError } = await supabase.storage.from('bucket_name').upload('file_path', file)
    if (uploadError) throw new Error(uploadError.message)


    // return id
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
