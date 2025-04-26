import { createContext, useEffect, useState } from 'react'
import supabase from '../services/supabase'

const Context = createContext()

function AppProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [newPlaceName, setNewPlaceName] = useState('New location')
    const [session, setSession] = useState(null)

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            setSession(session)
        }

        getSession()

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
