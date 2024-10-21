import supabase from './supabase'
import useGetSession from '../hooks/useGetSession.jsx'

export async function googleSignIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    })

    if (error) throw new Error(error.message)

    const { provider } = data

    return provider
}

export async function getCurrentUser() {
    const session = await useGetSession()
    if (!session) return null

    const { data: user, error } = await supabase.auth.getUser()

    if (error) throw new Error(error.message)

    return user?.user
}
