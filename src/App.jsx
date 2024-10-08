import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Location from './pages/Location'
import AddLocation from './pages/AddLocation'
import NoMatch from './pages/NoMatch'
import { Suspense } from 'react'
import SpinnerFull from './components/SpinnerFull'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import EditLocation from './pages/EditLocation'
import ProtectedRoute from './components/ProtectedRoute'

const queryClient = new QueryClient({
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
            <BrowserRouter>
                <Suspense fallback={<SpinnerFull />}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Layout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Home />}></Route>
                            <Route
                                path="create"
                                element={<AddLocation />}
                            ></Route>
                            <Route
                                path="location/:id/edit"
                                element={<EditLocation />}
                            ></Route>
                            <Route
                                path="location/:id"
                                element={<Location />}
                            ></Route>
                            <Route path="login" element={<Login />}></Route>
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
