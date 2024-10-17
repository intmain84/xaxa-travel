import { createContext, useState } from 'react'

const UserContext = createContext()

function UserProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
