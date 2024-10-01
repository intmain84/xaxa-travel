import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Location from './pages/Location'
import AddLocation from './pages/AddLocation'
import NoMatch from './pages/NoMatch'
import { Suspense } from 'react'
import SpinnerFull from './components/SpinnerFull'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />}></Route>
                            <Route path="login" element={<Login />}></Route>
                            <Route path="signup" element={<Signup />}></Route>
                            <Route
                                path="form"
                                element={<AddLocation />}
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
        </QueryClientProvider>
    )
}

export default App
