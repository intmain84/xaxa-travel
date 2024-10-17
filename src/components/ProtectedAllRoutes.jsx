import { useContext, useEffect } from 'react'
import useUser from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import SpinnerFull from './SpinnerFull'
import { UserContext } from '../context/UserContext'

function ProtectedAllRoutes({ children }) {
    const { setIsLoggedIn } = useContext(UserContext)
    const navigate = useNavigate()

    const { uuid, isAuthenticated, isPending, error } = useUser()

    useEffect(() => {
        if (!isAuthenticated && !isPending) {
            setIsLoggedIn(null)
            navigate('/')
        } else if (isAuthenticated && !isPending && !error) {
            setIsLoggedIn(uuid)
        }
    }, [isAuthenticated, isPending])

    if (isPending && !error) return <SpinnerFull />

    if (error) return <div>{error.message}</div>

    if (isAuthenticated && !isPending && !error) {
        return children
    }
}

export default ProtectedAllRoutes
