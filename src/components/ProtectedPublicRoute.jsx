import { useContext, useEffect } from 'react'
import useUser from '../hooks/useUser'
import SpinnerFull from './SpinnerFull'
import { UserContext } from '../context/UserContext'

function ProtectedPublicRoute({ children }) {
    const { setIsLoggedIn } = useContext(UserContext)

    const { isAuthenticated, isPending, error } = useUser()

    useEffect(() => {
        if (isAuthenticated && !isPending) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [isAuthenticated, isPending])

    if (isPending && !error) return <SpinnerFull />

    if (error) return <div>{error.message}</div>

    return children
}

export default ProtectedPublicRoute
