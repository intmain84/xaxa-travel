import { useContext } from 'react'
import Button from '../components/Button'
import useSignIn from '../hooks/useSignIn'
import { Context } from '../context/Context.jsx'
import LastAddedLocations from './LastAddedLocations.jsx'
import { Suspense } from 'react'
import LocationsSkeleton from '../components/skeletons/LocationsSkeleton.jsx'
import SignInBlockSkeleton from '../components/skeletons/SignInBlockSkeleton.jsx'

function Home() {
    const { signIn, signInError } = useSignIn()
    const { session, isPending: sessionLoading } = useContext(Context)

    return (
        <div className="m-4 mx-auto flex w-[calc(100%-32px)] flex-col">
            {!session && sessionLoading && <SignInBlockSkeleton />}
            {!session && !sessionLoading && (
                <div className="h-shv mb-4 flex items-center gap-5 bg-orange-300 p-5">
                    <div className="flex flex-1 flex-col align-top">
                        <h2 className="text-lg">Sign in to add locations</h2>
                        <p>
                            Explore iconic locations from your favorite movies
                            and TV series! Walk in the footsteps of Marty McFly
                            or Walter White!
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
            <Suspense fallback={<LocationsSkeleton />}>
                <LastAddedLocations />
            </Suspense>
        </div>
    )
}

export default Home
