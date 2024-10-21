import useGetUserLocations from './useGetUserLocations.js'
import supabase from '../services/supabase.js'

async function useGetSession() {
    const { data: session } = await supabase.auth.getSession()

    return session.session
}

export default useGetSession
