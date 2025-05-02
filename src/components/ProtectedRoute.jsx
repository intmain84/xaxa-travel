import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../context/Context'

const ProtectedRoute = ({ children }) => {
    const { session, isPending } = useContext(Context)

    if (!isPending && !session) {
        // Redirect to Home page if user is not authenticated
        return <Navigate to="/" replace />
    }

    // Render child components if user is authenticated
    if (!isPending && session) return children
}

export default ProtectedRoute
