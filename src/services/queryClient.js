import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1200000, //20 min
        },
    },
})

export { queryClient, QueryClientProvider }
