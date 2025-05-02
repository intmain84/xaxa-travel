import { useContext } from 'react'
import Button from '../components/Button'
import useSignIn from '../hooks/useSignIn'
import { Context } from '../context/Context.jsx'
import LastAddedLocations from './LastAddedLocations.jsx'

function Home() {
    const { signIn, signInError } = useSignIn()
    const { session } = useContext(Context)

    //If no session, show the welcome screen
    return (
        <div className="mx-auto mt-4 flex max-w-[100%-16px] flex-col">
            {!session && (
                <div className="h-shv mx-4 mb-4 flex items-center gap-5 bg-orange-300 p-5">
                    <div className="flex flex-1 flex-col align-top">
                        <h2 className="text-lg">Sign in to add locations</h2>
                        <p>
                            Explore iconic locations from your favorite movies
                            and video games! Walk in the footsteps of Marty
                            McFly or Arthur Morgan!
                        </p>
                    </div>
                    <Button
                        variant="secondary"
                        className="w-[136px]"
                        onClick={signIn}
                    >
                        Sign In
                    </Button>
                </div>
            )}
            <LastAddedLocations />
        </div>
    )
}

export default Home
