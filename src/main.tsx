import ReactDOM from 'react-dom/client'

import './app/styles/index.scss'
import { App } from '@/app/App'

const tg = window?.Telegram?.WebApp

tg?.ready()
tg?.disableVerticalSwipes()

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
