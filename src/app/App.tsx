import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/app/providers/AuthContext'
import { Navigation } from '@/app/navigation'
import { SDKProvider } from '@telegram-apps/sdk-react'
import { MiniAppProvider } from '@/app/providers/miniapp-provider'
import { Provider } from 'react-redux'
import { store } from '@/app'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

export function App() {
	return (
		<Provider store={store}>
			<SDKProvider debug>
				<MiniAppProvider>
					<QueryClientProvider client={queryClient}>
						<BrowserRouter>
							<AuthProvider>
								<Navigation />
							</AuthProvider>
						</BrowserRouter>
					</QueryClientProvider>
				</MiniAppProvider>
			</SDKProvider>
		</Provider>
	)
}
