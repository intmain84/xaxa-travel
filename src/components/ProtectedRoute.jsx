import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../context/Context'

const ProtectedRoute = ({ children }) => {
    const { session } = useContext(Context)

    //TODO Navigate to Home if user is not authenticated

    if (!session) {
        // Redirect to login if user is not authenticated
        return <Navigate to="/login" replace />
    }

    // Render child components if user is authenticated
    return children
}

export default ProtectedRoute
