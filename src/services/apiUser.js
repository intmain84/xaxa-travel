import supabase from './supabase'

//GET USER
export async function getUser(id) {
    let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)

    if (data.length === 0) throw new Error('User not found')

    if (error) throw new Error(error.message)

    return data[0]
}
