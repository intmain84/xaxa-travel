import { useQuery } from '@tanstack/react-query'
import Button from '../components/Button'
import { googleSignIn } from '../services/apiAuth'

function Home() {
    // const { data, refetch, error } = useQuery({
    //     queryKey: ['user'],
    //     queryFn: googleSignIn,
    //     enabled: false,
    // })

    const refetch = async () => {
        const data = await googleSignIn()
        console.log(data)
    }

    return (
        <div className="h-shv flex flex-col items-center">
            <div>
                <h1 className="text-center">
                    Put every piece of journeys on the map!
                </h1>
                <p className="mt-4 text-center text-lg">
                    Discover new places with fellow travelers and share your own
                    on the map. You need to login to add locations
                </p>

                <div className="mt-5 flex w-full gap-3">
                    <Button width="flex-1" onClick={refetch}>
                        Login'
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home
