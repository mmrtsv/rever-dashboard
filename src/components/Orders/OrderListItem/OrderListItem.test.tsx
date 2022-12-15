import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import OrderListItem from './OrderListItem'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'

describe('Order List Item test', () => {
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

    it('should render', () => {
        store = mockStore(loggedInState)

        const lineItem: ModelsPublicReturnLineItem = {
            action: 1,
            comment: '',
            id: '',
            name: 'BEAR HOOD - XS',
            pending_purchase: false,
            product: undefined,
            product_id: '7368369995937',
            quantity: 1,
            refund_payment_method: 1,
            return_process: undefined,
            return_reason: 7,
            rever_id: 'retl_2IrCxoRm7E2ClFn63JaapvmuPnd',
            sku: '1119-XS',
            subtotal: 4876,
            total: 5900,
            total_discounts: 0,
            total_taxes: 1024,
            type: 'product',
            unit_price: 4876,
            variant_id: '41927678361761',
            variant_name: 'XS'
        }

        render(
            <Router>
                <Provider store={store}>
                    <OrderListItem key={1} lineItem={lineItem} />
                </Provider>
            </Router>
        )
        screen.getByTestId('OrderListItem')
    })
})
