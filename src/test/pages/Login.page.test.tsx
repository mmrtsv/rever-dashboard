import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'

import LoginPage from '../../auth/Login.page'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'

// const mockedNavigator = vi.fn()

// vi.mock('react-router-dom', () => ({
//     ...(vi.importActual('react-router-dom') as any),

//     useNavigate: () => mockedNavigator
// }))
describe('Login Page', () => {
    const initialState = { authApi: { login: { loading: 'idle' } } }
    const loggedInState = {
        authApi: {
            login: { loading: 'idle', response: { user: { name: 'Test' } } }
        }
    }
    const mockStore = configureStore()
    let store

    afterEach(cleanup)

    it('should render all components', () => {
        store = mockStore(initialState)
        render(
            <Router>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </Router>
        )
        screen.getByTestId('sign-in')
        screen.getByTestId('login-form')
        screen.getByTestId('username-input')
        screen.getByTestId('password-input')
        screen.getByTestId('sign-in-button')
        screen.getByTestId('landing-image')
    })
})
