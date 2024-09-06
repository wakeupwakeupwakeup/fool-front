import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LoadingPage } from '@/pages/loading'
import { AuthProvider } from '@/app/providers/AuthContext'
import { ModalProvider } from '@/app/providers/ModalContext'
import { Navigation } from '@/app/navigation'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

export function App() {
	// const [isLoading, setIsLoading] = useState(true)
	//
	// const handleLoading = () => {
	// 	setTimeout(() => setIsLoading(false), 500)
	// }
	//
	// useEffect(() => {
	// 	if (
	// 		document.readyState === 'complete' ||
	// 		document.readyState === 'interactive'
	// 	) {
	// 		handleLoading()
	// 	} else {
	// 		const onContentLoaded = () => {
	// 			handleLoading()
	// 			window.removeEventListener('load', onContentLoaded)
	// 		}
	// 		window.addEventListener('load', onContentLoaded)
	// 	}
	// }, [])
	//
	// if (isLoading) return <LoadingPage />

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AuthProvider>
					<ModalProvider>
						<Navigation />
					</ModalProvider>
				</AuthProvider>
			</BrowserRouter>
		</QueryClientProvider>
	)
}
