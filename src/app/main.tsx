import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SDKProvider } from '@telegram-apps/sdk-react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { MiniAppProvider } from '@/app/providers/miniapp-provider'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { store } from '@/app/store'
import { Navigation } from '@/app/navigation/Navigation'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<SDKProvider debug>
			<MiniAppProvider>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<Navigation />
					</BrowserRouter>
				</QueryClientProvider>
			</MiniAppProvider>
		</SDKProvider>
	</Provider>,
)
