import Button from '../components/Button'
import { googleSignIn } from '../services/apiAuth'
import { useState } from 'react'

function Home() {
    const [signInError, setSignInError] = useState(false)

    const signIn = async () => {
        const error = await googleSignIn()

        setSignInError(!!error)
    }

    // TODO PROCESS ERROR CASE!
    if (signInError) return <div>SIGN IN ERROR</div>
    if (!signInError)
        return (
            <div className="flex h-[calc(100%-72px-56px)] flex-col justify-center">
                <div className="h-shv mx-4 flex flex-col items-center gap-5 p-5 text-center">
                    <h1 className="text-center">Fly High, Map Far!</h1>
                    <p className="text-center text-lg">
                        Discover new places with fellow travelers and share your
                        own on the map. You need to login to add locations
                    </p>
                    <Button primary width="w-full" onClick={signIn}>
                        Sign In
                    </Button>
                </div>
            </div>
        )
}

export default Home
