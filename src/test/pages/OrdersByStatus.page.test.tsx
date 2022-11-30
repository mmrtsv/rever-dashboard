import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'

import OrdersByStatus from '../../pages/RetLineItemsByStatus.page'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18nForTests'

describe('Orders By Status Page tests', () => {
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
            isSidebarOpen: true
        }
    }

    afterEach(cleanup)

    const mockStore = configureStore()
    let store

    it('should display a title and a search field', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <OrdersByStatus />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByText('Overview')
        screen.getByText('BUSCADOR')
    })

    it('should display 2 columns', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <OrdersByStatus />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByText('Pending to Receive', { exact: false })
        screen.getByText('Completed', { exact: false })
    })

    it('should render returned lineItems cards', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <OrdersByStatus />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getAllByTestId('retLineItemCard')
    })

    it('should display order ID, product image and product name', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <OrdersByStatus />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getAllByText('Order ID:')
        screen.getAllByAltText('ProductImage')
        screen.getAllByTestId('ProductName')
    })
})
