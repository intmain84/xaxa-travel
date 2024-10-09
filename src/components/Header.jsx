import { Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import supabase from '../services/supabase'
import Button from '../components/Button'
import { queryClient } from '../App'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function Header() {
    const { isLoggedIn } = useContext(UserContext)
    const navigate = useNavigate()

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        queryClient.invalidateQueries({ queryKey: ['user'] })
        // if (!error) {
        //     navigate('/', { replace: true })
        // }
    }

    return (
        <header className="mb-8 flex justify-center text-xl">
            <Link to="/" className="block w-[200px]">
                <Logo />
            </Link>

            {isLoggedIn && (
                <Button width="flex-1" onClick={signOut}>
                    Login out
                </Button>
            )}
        </header>
    )
}

export default Header
