import Button from '../components/Button'
import useSignIn from '../hooks/useSignIn.jsx'

function Home() {
    const { signIn, signInError } = useSignIn()

    // TODO PROCESS ERROR CASE!
    if (signInError) return <div>SIGN IN ERROR</div>
    if (!signInError)
        return (
            <div className="flex h-[calc(100%-72px)] flex-col justify-center">
                <div className="h-shv mx-4 flex flex-col items-center gap-5 px-5 text-center">
                    <h1>Fly High, Map Far!</h1>
                    <p className="text-center">
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
