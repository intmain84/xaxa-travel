import { createContext, useEffect, useState } from 'react'
import supabase from '../services/supabase'

const Context = createContext()

function AppProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [newPlaceName, setNewPlaceName] = useState('New location')
    const [session, setSession] = useState(null)

    useEffect(() => {
        const getSesstion = async () => {
            await supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session)
            })
        }

        getSesstion()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <Context.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                newPlaceName,
                setNewPlaceName,
                session,
                setSession,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export { Context, AppProvider }
