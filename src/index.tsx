import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import 'tailwindcss/tailwind.css'
import './index.css'
import './i18n'
import { ThemeProvider } from '@itsrever/design-system'
import { Auth0Provider } from '@auth0/auth0-react'
import ErrorBoundary from './ErrorBoundary'

const ErrorPage = lazy(() => import('./pages/Error.page'))

const Domain = import.meta.env.VITE_AUTH0_DOMAIN
const ClientId = import.meta.env.VITE_AUTH0_CLIENT

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Auth0Provider
            domain={Domain}
            clientId={ClientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: 'dashboard-api'
            }}
        >
            <ErrorBoundary fallback={<ErrorPage />}>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </Auth0Provider>
    </Provider>
)
