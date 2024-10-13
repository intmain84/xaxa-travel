import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

 const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            ///sdf
            staleTime: 0,
        },
    },
})

export { queryClient, QueryClientProvider };