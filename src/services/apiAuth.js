import supabase from './supabase'

export async function googleSignIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    })

    if (error) throw newError(error.message)

    const { provider } = data

    return provider
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) return null

    const { data: user, error } = await supabase.auth.getUser()

    if (error) throw newError(error.message)

    return user?.user
}
