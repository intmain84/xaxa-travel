import { Link } from 'react-router-dom'
import { queryClient } from '../services/queryClient.js'
import supabase from '../services/supabase'
import Logo from './Logo'
import { useContext } from 'react'
import { Context } from '../context/Context.jsx'
import AccountIc from './icons/AccountIc.jsx'
import useSignIn from '../hooks/useSignIn.jsx'
import LogoutIc from './icons/LogoutIc.jsx'

function Header() {
    const { signIn, signInError } = useSignIn()
    const { session } = useContext(Context)

    const signOut = async () => {
        const { error: signOutError } = await supabase.auth.signOut()
        queryClient.invalidateQueries({ queryKey: ['user'] })
    }

    return (
        <header className="relative mt-6 flex h-7 justify-end px-4 text-xl">
            <Link
                to="/"
                className="absolute left-1/2 -translate-x-1/2 text-center"
            >
                <Logo />
            </Link>

            <div className="flex">
                {session && (
                    <div onClick={signIn} className="ml-auto cursor-pointer">
                        <AccountIc />
                    </div>
                )}
                {session && (
                    <div onClick={signOut} className="ml-auto cursor-pointer">
                        <LogoutIc />
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
