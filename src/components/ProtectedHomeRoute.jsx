import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'
import SpinnerFull from './SpinnerFull'
import { UserContext } from '../context/UserContext'

function ProtectedHomeRoute({ children }) {
    const navigate = useNavigate()
    const { setIsLoggedIn } = useContext(UserContext)

    const { uuid, isAuthenticated, isPending, error } = useUser()

    useEffect(() => {
        if (isAuthenticated && !isPending) {
            setIsLoggedIn(uuid)
            navigate('/profile')
        }
    }, [isAuthenticated, isPending])

    if (isPending && !error) return <SpinnerFull />

    if (error) return <div>{error.message}</div>

    if (!isAuthenticated && !isPending && !error) {
        return children
    }
}

export default ProtectedHomeRoute
