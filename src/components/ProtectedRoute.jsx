import useUser from '../hooks/useUser'
import SpinnerFull from './SpinnerFull'

function ProtectedRoute({ children }) {
    const { user, isPending, error } = useUser()

    if (isPending) return <SpinnerFull />

    return children
}

export default ProtectedRoute
