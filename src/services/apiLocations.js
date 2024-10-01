import supabase from './supabase'

export async function getCoordinates() {
    const { data, error } = await supabase
        .from('locations')
        .select('id, name, lat, lng')

    if (error) throw new Error(error.message)

    return data
}

export async function getLocation(id) {
    let { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('id', id)

    if (error) throw new Error(error.message)

    const location = data[0]

    return location
}

export async function createLocation(newLocation) {
    const { data, error } = await supabase
        .from('locations')
        .insert([newLocation])
        .select()

    if (error) throw new Error(error.message)

    const { id } = data[0]

    return id
}
