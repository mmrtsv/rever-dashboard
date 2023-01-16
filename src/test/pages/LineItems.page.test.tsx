import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@itsrever/design-system'
import thunk from 'redux-thunk'
import i18n from '../../i18nForTests'
import { I18nextProvider } from 'react-i18next'

import LineItemsPage from '../../pages/LineItems.page'

describe('Line Items Page', () => {
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
        },
        tokenData: {
            token: 'xxxx'
        },
        lineItemsApi: {
            getLineItems: {
                loading: 'idle',
                response: { next: '', rowcount: 17, line_items: [] }
            }
        },
        userApi: {
            getMe: {
                response: {},
                Loading: 'idle'
            }
        },
        generalData: {
            group: 'nudeproject',
            ecommerceList: ['nudeproject']
        }
    }

    const middlewares = [thunk]
    const mockStore = configureStore(middlewares)
    let store
    afterEach(cleanup)

    it('should render the orders table', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <LineItemsPage />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('OrdersTable')
    })
})
