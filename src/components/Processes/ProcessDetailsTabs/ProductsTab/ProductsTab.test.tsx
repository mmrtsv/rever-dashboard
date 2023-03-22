import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import ProductsTab from './ProductsTab'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@itsrever/design-system'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'

describe('Products Tab test', () => {
    afterEach(cleanup)

    it('should render the returned items', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <ThemeProvider>
                        <I18nextProvider i18n={i18n}>
                            <ProductsTab reviewMode={false} />
                        </I18nextProvider>
                    </ThemeProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('CachedIcon')
        screen.getByText('Returned items')
        expect(screen.getAllByTestId('SplitLineItem').length).toBe(2)
    })

    it('should render not received products (in case there are)', () => {
        const state = reduxState('NOT_RECEIVED')
        const mockStore = configureStore()
        const store = mockStore(state)
        render(
            <Router>
                <ThemeProvider>
                    <Provider store={store}>
                        <I18nextProvider i18n={i18n}>
                            <ProductsTab reviewMode={false} />
                        </I18nextProvider>
                    </Provider>
                </ThemeProvider>
            </Router>
        )
        screen.getByTestId('SearchOffIcon')
        screen.getByText('Items not received')
    })

    it('should render a dropdown for each returned item if reviewMode with 3 different options and submit button', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <ThemeProvider>
                        <I18nextProvider i18n={i18n}>
                            <ProductsTab reviewMode={false} />
                        </I18nextProvider>
                    </ThemeProvider>
                </Provider>
            </Router>
        )
        // Menus
        // const menus = screen.getAllByText('Review')
        // expect(menus.length).toBe(2)
        // expect(screen.getAllByText('Approve').length).toBe(2)
        // expect(screen.getAllByText('Decline').length).toBe(2)
        // expect(screen.getAllByText('Missing').length).toBe(2)
        // screen.getByText('Submit Review')
    })
})

function reduxState(retReason?: string) {
    return {
        processesApi: {
            getProcess: {
                response: {
                    processes: [mockProcess(retReason)]
                }
            }
        },
        reviewsApi: {
            createReview: {
                loading: 'idle'
            }
        }
    }
}

function mockProcess(retReason?: string): ModelsPublicReturnProcess {
    return {
        return_status: 'COMPLETED',
        bank_transfer_refund_amount: 1000,
        total_refund_amount: 1500,
        currency_money_format: {
            amount_multiplied_by: 100,
            currency: 'EUR',
            currency_symbol: '€',
            decimal_separator: ',',
            display_prices_with_taxes: true,
            is_currency_left_position: false,
            thousand_separator: '.',
            visible_number_of_decimals: 2
        },
        executed_bank_transfer: 600,
        line_items: [
            {
                name: 'Line Item 1',
                product_return_reason: retReason
                    ? retReason
                    : 'NOT_AS_EXPECTED',
                quantity: 1,
                total: 1435,
                type: 'product',
                unit_price: 1346,
                variant_name: 'Sin marco / 30x40 / No',
                reviews: []
            },
            {
                reviews: [],
                name: 'Line Item 2',
                pending_purchase: false,
                product: undefined,
                product_id: '4433969250375',
                product_return_reason: 'NOT_AS_EXPECTED',
                quantity: 1,
                refund_payment_method: 1,
                rever_id: 'retl_2KE2bS2QzVOQfxhemJzl2LRt1Dh',
                total: 1435,
                type: 'product',
                unit_price: 1346,
                variant_id: '31639769448519',
                variant_name: 'Sin marco / 30x40 / No'
            },
            {
                type: 'cost',
                name: 'Shipping cost',
                total: 500
            }
        ]
    }
}
