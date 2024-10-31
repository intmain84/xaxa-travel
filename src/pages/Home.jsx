import Button from '../components/Button'
import { googleSignIn } from '../services/apiAuth'
import { useState } from 'react'

function Home() {
    const [signInError, setSignInError] = useState(false)

    const signIn = async () => {
        const error = await googleSignIn()

        setSignInError(error)
    }

    // TODO PROCESS ERROR CASE!
    if (signInError) return <div>SIGN IN ERROR</div>
    if (!signInError)
        return (
            <div className="h-shv flex flex-col items-center">
                <div>
                    <h1 className="text-center">
                        Put every piece of journeys on the map!
                    </h1>
                    <p className="mt-4 text-center text-lg">
                        Discover new places with fellow travelers and share your
                        own on the map. You need to login to add locations
                    </p>

                    <div className="mt-5 flex w-full gap-3">
                        <Button secondary width="flex-1" onClick={signIn}>
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        )
}

export default Home
