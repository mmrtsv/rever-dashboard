import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import LineItemsTable from './LineItemsTable'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'

describe('Line Items table tests', () => {
    const middlewares = [thunk]
    afterEach(cleanup)

    it('should render the line items and pagination', () => {
        const state = reduxState()
        const mockStore = configureStore(middlewares)
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <LineItemsTable
                            actualPage={0}
                            setActualPage={() => null}
                            lineItems={lineItems()}
                            totalLineItems={50}
                        />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        // Items
        screen.getByText('BEAR HOOD - XS')

        // Pagination
        screen.getByText('10 / page')
        screen.getByText('5 total pages')
    })
})

function lineItems() {
    const lineItems: ModelsPublicReturnLineItem[] = [
        {
            action: 1,
            comment: '',
            id: '',
            name: 'BEAR HOOD - XS',
            pending_purchase: false,
            product: undefined,
            product_id: '7368369995937',
            quantity: 1,
            refund_payment_method: 1,
            return_process: {
                customer_printed_order_id: 'ES-179615',
                customer: {
                    first_name: 'Oskar',
                    last_name: 'Lozano'
                },
                started_at: {
                    nanos: 764216000,
                    seconds: 1675179369
                },
                last_known_shipping_status: 3
            },
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
    ]
    return lineItems
}

function reduxState() {
    return {
        generalData: {
            limitPagination: 10
        }
    }
}
