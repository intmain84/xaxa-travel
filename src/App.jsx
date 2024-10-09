import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Layout from './components/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Location from './pages/Location'
import AddLocation from './pages/AddLocation'
import EditLocation from './pages/EditLocation'

import NoMatch from './pages/NoMatch'
import SpinnerFull from './components/SpinnerFull'

import ProtectedAllRoutes from './components/ProtectedAllRoutes'
import ProtectedHomeRoute from './components/ProtectedHomeRoute'
import { UserProvider } from './context/UserContext'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 60 * 1000,
            staleTime: 0,
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <UserProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFull />}>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                {/* Protected Home route */}
                                <Route
                                    index
                                    element={
                                        <ProtectedHomeRoute>
                                            <Home />
                                        </ProtectedHomeRoute>
                                    }
                                ></Route>

                                {/* Protected routes */}
                                <Route
                                    path="create"
                                    element={
                                        <ProtectedAllRoutes>
                                            <AddLocation />
                                        </ProtectedAllRoutes>
                                    }
                                ></Route>
                                <Route
                                    path="location/:id/edit"
                                    element={
                                        <ProtectedAllRoutes>
                                            <EditLocation />
                                        </ProtectedAllRoutes>
                                    }
                                ></Route>
                                <Route
                                    path="profile"
                                    element={
                                        <ProtectedAllRoutes>
                                            <Profile />
                                        </ProtectedAllRoutes>
                                    }
                                ></Route>

                                {/* Public routes */}
                                <Route
                                    path="location/:id"
                                    element={<Location />}
                                ></Route>
                                <Route path="*" element={<NoMatch />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </UserProvider>
        </QueryClientProvider>
    )
}

export default App
