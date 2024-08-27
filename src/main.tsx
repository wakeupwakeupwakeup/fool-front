import ReactDOM from 'react-dom/client'

import App from './App'
import './index.scss'

const tg = window?.Telegram?.WebApp

tg?.ready()
tg?.disableVerticalSwipes()

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
