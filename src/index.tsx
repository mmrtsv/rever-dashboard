import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import './index.css'
import './i18n'
import 'tailwindcss/tailwind.css'
import { ThemeProvider } from '@itsrever/design-system'
import { Auth0Provider } from '@auth0/auth0-react'

const Domain = import.meta.env.VITE_AUTH0_DOMAIN
const ClientId = import.meta.env.VITE_AUTH0_CLIENT

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Auth0Provider
            domain={Domain}
            clientId={ClientId}
            redirectUri={window.location.origin}
            audience="dashboard-api"
        >
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Auth0Provider>
    </Provider>
)
