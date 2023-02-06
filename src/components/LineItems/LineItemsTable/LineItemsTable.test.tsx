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

describe('Line Items table tests', () => {
    const middlewares = [thunk]
    afterEach(cleanup)

    it('should render the titles, items and pagination', () => {
        const state = reduxState()
        const mockStore = configureStore(middlewares)
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <LineItemsTable
                            currentTab={0}
                            freeText={''}
                            actualPage={0}
                            setActualPage={() => null}
                        />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        // Titles
        screen.getByText('Return date')

        // Items
        screen.getByText('BEAR HOOD - XS')

        // Pagination
        screen.getByText('10 / page')
    })
})

function reduxState() {
    return {
        lineItemsApi: {
            getLineItems: {
                loading: 'idle',
                response: {
                    next: '',
                    rowcount: 17,
                    line_items: [
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
                }
            },
            getPendingLineItems: {
                loading: 'idle',
                response: { next: '', rowcount: 17, line_items: [] }
            },
            getCompletedLineItems: {
                loading: 'idle',
                response: { next: '', rowcount: 17, line_items: [] }
            }
        },
        generalData: {
            selectedECommerce: undefined
        },
        userApi: {
            token: 'XXX'
        }
    }
}
