import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient, QueryClientProvider } from './services/queryClient.js'

import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Location from './pages/Location.jsx'
import AddLocation from './pages/AddLocation.jsx'
import EditLocation from './pages/EditLocation.jsx'

import NoMatch from './pages/NoMatch.jsx'
import SpinnerFull from './components/SpinnerFull.jsx'

import { AppProvider } from './context/Context.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <AppProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFull />}>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />}></Route>

                                <Route
                                    path="create"
                                    element={
                                        <ProtectedRoute>
                                            <AddLocation />
                                        </ProtectedRoute>
                                    }
                                ></Route>
                                <Route
                                    path="location/edit/:id"
                                    element={
                                        <ProtectedRoute>
                                            <EditLocation />
                                        </ProtectedRoute>
                                    }
                                ></Route>
                                <Route
                                    path="profile"
                                    element={
                                        <ProtectedRoute>
                                            <Profile />
                                        </ProtectedRoute>
                                    }
                                ></Route>
                                <Route
                                    path="location/:id"
                                    element={<Location />}
                                ></Route>
                                <Route path="*" element={<NoMatch />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </AppProvider>
        </QueryClientProvider>
    )
}

export default App
