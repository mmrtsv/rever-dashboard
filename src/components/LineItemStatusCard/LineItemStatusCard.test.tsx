import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'

import LineItemByStatus from './LineItemStatusCard'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18nForTests'

describe('LineItemsStatusCard', () => {
    const retLineItem: ModelsPublicReturnLineItem = {
        name: 'OREGANO HOOD GREEN - M',
        return_process: {
            customer_printed_order_id: '#166558'
        },
        product: {
            images: undefined
        }
    }

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

    it('should display order ID, product image and product name', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <LineItemByStatus lineItem={retLineItem} />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByText('Order ID:')
        screen.getAllByAltText('ProductImage')
        screen.getAllByTestId('ProductName')
    })
})
