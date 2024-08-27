import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Loading } from '@/components/screens'

import Navigation from '@/navigation/Navigation'
import { AuthProvider } from '@/providers/AuthContext'
import { ModalProvider } from '@/providers/ModalContext'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

function App() {
	const [isLoading, setIsLoading] = useState(true)

	const handleLoading = () => {
		setTimeout(() => setIsLoading(false), 500)
	}

	useEffect(() => {
		if (
			document.readyState === 'complete' ||
			document.readyState === 'interactive'
		) {
			handleLoading()
		} else {
			const onContentLoaded = () => {
				handleLoading()
				window.removeEventListener('load', onContentLoaded)
			}
			window.addEventListener('load', onContentLoaded)
		}
	}, [])

	if (isLoading) return <Loading />

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

export default App
