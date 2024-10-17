import supabase from './supabase'

export async function googleSignIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:5173/welcome',
        },
    })

    if (error) {
        console.log('Ошибка', error)
    }
    
    const { provider } = data

    return provider
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) return null

    const { data: user, error } = await supabase.auth.getUser()

    console.log(user)

    if (error) {
        console.log('Ошибка', error)
    }

    return user?.user
}
