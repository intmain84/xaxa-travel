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
