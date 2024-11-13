import { googleSignIn } from '../services/apiAuth'
import { useState } from 'react'

function UseSignIn() {
    const [signInError, setSignInError] = useState(false)

    const signIn = async () => {
        const error = await googleSignIn()

        setSignInError(!!error)
    }

    return { signInError, signIn }
}

export default UseSignIn
