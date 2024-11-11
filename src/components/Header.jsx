import { Link } from 'react-router-dom'
import { queryClient } from '../services/queryClient.js'
import supabase from '../services/supabase'

import Logo from './Logo'
import Button from '../components/Button'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function Header() {
    const { isLoggedIn } = useContext(UserContext)

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        queryClient.invalidateQueries({ queryKey: ['user'] })
    }

    return (
        <header className="mt-6 flex justify-center text-xl px-4">
            <Link to="/" className="">
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
