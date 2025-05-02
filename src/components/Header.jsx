import { Link } from 'react-router-dom'
import { queryClient } from '../services/queryClient.js'
import supabase from '../services/supabase'
import Logo from './Logo'
import { useContext } from 'react'
import { Context } from '../context/Context.jsx'
import { LogOut, User } from 'lucide-react'

function Header() {
    const { session } = useContext(Context)

    const signOut = async () => {
        const { error: signOutError } = await supabase.auth.signOut()
        queryClient.invalidateQueries({ queryKey: ['user'] })
    }

    return (
        <header className="relative flex h-11 items-center justify-between p-4 text-xl">
            <Link to="/" className="flex h-5 w-5">
                <Logo />
            </Link>

            <div className="flex gap-4">
                {session && (
                    <Link
                        to="/profile"
                        className="group ml-auto cursor-pointer"
                    >
                        <User
                            size={24}
                            strokeWidth={2}
                            className="transition-colors group-hover:text-blue-600"
                        />
                    </Link>
                )}
                {session && (
                    <button
                        onClick={signOut}
                        className="group ml-auto cursor-pointer"
                    >
                        <LogOut
                            size={24}
                            strokeWidth={2}
                            className="transition-colors group-hover:text-blue-600"
                        />
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header
