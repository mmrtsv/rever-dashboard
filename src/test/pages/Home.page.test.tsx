import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@itsrever/design-system'

import Home from '../../pages/Financials.page'

// Good for now - to be changed when home is updated
describe('Home Page', () => {
    const loggedInState = {
        authApi: {
            login: { loading: 'idle', response: {} }
        },
        userData: {
            user: {
                name: 'admin@partner.com',
                avatar: 'https://cdn-icons-png.flaticon.com/512/187/187134.png',
                role: 'admin',
                group: 'REVER'
            }
        },
        appState: {
            isSidebarOpen: false
        }
    }
    const mockStore = configureStore()
    let store
    afterEach(cleanup)

    it('should render', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <ThemeProvider>
                        <Home />
                    </ThemeProvider>
                </Provider>
            </Router>
        )
        screen.getByText('HOME!')
    })
})
