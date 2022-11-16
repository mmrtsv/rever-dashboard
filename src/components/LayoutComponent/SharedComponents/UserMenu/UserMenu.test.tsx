import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { UserMenu, userOptions } from './UserMenu'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../../i18nForTests'

describe('UserMenu testing', () => {
    afterEach(cleanup)
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

    it('should always render avatar', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <UserMenu />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('avatar')
    })

    it('should display correct settings', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <UserMenu />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        userOptions.forEach((option) => {
            screen.getByText(option.en)
        })
    })
})
