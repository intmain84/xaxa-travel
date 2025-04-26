import { useContext } from 'react'
import Button from '../components/Button'
import useSignIn from '../hooks/useSignIn.jsx'
import { Context } from '../context/Context.jsx'
import LastAddedLocations from './LastAddedLocations.jsx'

function Home() {
    const { signIn, signInError } = useSignIn()
    const { session } = useContext(Context)

    //If session, show last added locations
    if (session) {
        return <LastAddedLocations />
    }

    //If no session, show the welcome screen
    if (!session) {
        return (
            <div className="mx-auto flex h-[calc(100%-72px)] max-w-[400px] flex-col justify-center">
                <div className="h-shv mx-4 flex flex-col items-center gap-5 px-5 text-center">
                    <h1>Fly High, Map Far!</h1>
                    <p className="text-center">
                        Explore iconic locations from your favorite movies and
                        video games! Walk in the footsteps of Marty McFly or
                        Arthur Morgan!
                    </p>
                    <Button primary width="w-full" onClick={signIn}>
                        Sign In
                    </Button>
                </div>
            </div>
        )
    }
}

export default Home
