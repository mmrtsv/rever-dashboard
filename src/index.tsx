import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './redux/store'
import App from './App'
import './index.css'
import LoginPage from './auth/Login.page'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <LoginPage />
            </Router>
        </Provider>
    </React.StrictMode>
)
