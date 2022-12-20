import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'

import LoginPage from '../../auth/Login.page'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18nForTests'
import { ThemeProvider } from '@itsrever/design-system'

describe('Login Page', () => {
    const initialState = { authApi: { login: { loading: 'idle' } } }
    const mockStore = configureStore()
    let store

    afterEach(cleanup)

    it('should render all components', () => {
        store = mockStore(initialState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <LoginPage />
                        </ThemeProvider>
                    </I18nextProvider>
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
