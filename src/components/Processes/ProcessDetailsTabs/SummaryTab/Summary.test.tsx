import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import Summary from './Summary'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18nForTests'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ThemeProvider } from '@itsrever/design-system'

describe('Process test', () => {
    afterEach(cleanup)

    it('should display all the line items in the process in RetProductLineItems', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <ThemeProvider>
                        <I18nextProvider i18n={i18n}>
                            <Summary />
                        </I18nextProvider>
                    </ThemeProvider>
                </Provider>
            </Router>
        )
        expect(screen.getAllByTestId('RetProductSummary').length).toBe(2)
    })

    it('should display the finance summary with: total price, costs, refunds to methods and final balance', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <ThemeProvider>
                        <I18nextProvider i18n={i18n}>
                            <Summary />
                        </I18nextProvider>
                    </ThemeProvider>
                </Provider>
            </Router>
        )
        // Total refund
        screen.getByText('Total refund:')
        screen.getByText('28,70 €')

        // Costs
        screen.getByText('Shipping cost:')
        screen.getByText('5,00 €')

        // Refunds to methods
        screen.getByText('Coupon refund amount:')
        screen.getByText('Gift card refund amount:')
        screen.getByText('Bank transfer refund amount:')
        screen.getByText('Original payment method refund amount:')
        expect(screen.getAllByText('10,00 €').length).toBe(2)
        expect(screen.getAllByText('0,00 €').length).toBe(3)

        // Final balance
        screen.getByText('Final balance:')
    })

    it('should display the finance summary with the approved items if return_status is completed', () => {
        const state = reduxState('COMPLETED')
        const mockStore = configureStore()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <ThemeProvider>
                        <I18nextProvider i18n={i18n}>
                            <Summary />
                        </I18nextProvider>
                    </ThemeProvider>
                </Provider>
            </Router>
        )
        // Just 1 approved item
        expect(screen.getAllByTestId('RetProductSummary').length).toBe(1)

        // Total refund
        screen.getByText('Total refund:')
        screen.getByText('14,35 €') // sum of approved line items

        // Costs
        screen.getByText('Shipping cost:')
        screen.getByText('5,00 €')

        // Refunds to methods
        screen.getByText('Coupon refund amount:')
        screen.getByText('Gift card refund amount:')
        screen.getByText('Bank transfer refund amount:')
        screen.getByText('Original payment method refund amount:')
        expect(screen.getAllByText('6,00 €').length).toBe(2)
        expect(screen.getAllByText('0,00 €').length).toBe(3)

        // Final balance
        screen.getByText('Final balance:')
    })
})

function reduxState(returnStatus?: string) {
    return {
        processesApi: {
            getProcess: {
                response: {
                    processes: [mockProcess(returnStatus)]
                }
            }
        }
    }
}

function mockProcess(returnStatus?: string): ModelsPublicReturnProcess {
    return {
        return_status: returnStatus,
        bank_transfer_refund_amount: 1000,
        total_refund_amount: returnStatus ? 935 : 1500,
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
        approved_line_items: [
            {
                action: 2,
                comment: '',
                id: '',
                name: 'Line Item 1',
                product_image_url:
                    'https://cdn.shopify.com/s/files/1/0007/5192/7347/products/013603_bf_7ca0bb3e-99aa-4bea-89e5-ce07916c5dfb.jpg?v=1579616399',
                product_return_reason: 'NOT_AS_EXPECTED',
                quantity: 1,
                subtotal: 1346,
                total: 1435,
                total_discounts: 160,
                total_taxes: 249,
                type: 'product',
                unit_price: 1346,
                variant_name: 'Sin marco / 30x40 / No'
            },
            {
                type: 'cost',
                name: 'Shipping cost',
                total: 500
            }
        ],
        line_items: [
            {
                action: 2,
                comment: '',
                id: '',
                name: 'Line Item 1',
                product_image_url:
                    'https://cdn.shopify.com/s/files/1/0007/5192/7347/products/013603_bf_7ca0bb3e-99aa-4bea-89e5-ce07916c5dfb.jpg?v=1579616399',
                product_return_reason: 'NOT_AS_EXPECTED',
                quantity: 1,
                subtotal: 1346,
                total: 1435,
                total_discounts: 160,
                total_taxes: 249,
                type: 'product',
                unit_price: 1346,
                variant_name: 'Sin marco / 30x40 / No'
            },
            {
                action: 2,
                comment: '',
                id: '',
                name: 'Line Item 2',
                pending_purchase: false,
                product: undefined,
                product_id: '4433969250375',
                product_image_url:
                    'https://cdn.shopify.com/s/files/1/0007/5192/7347/products/013603_bf_7ca0bb3e-99aa-4bea-89e5-ce07916c5dfb.jpg?v=1579616399',
                product_return_reason: 'NOT_AS_EXPECTED',
                quantity: 1,
                refund_payment_method: 1,
                return_reason: 3,
                rever_id: 'retl_2KE2bS2QzVOQfxhemJzl2LRt1Dh',
                sku: 'P30x40-00-013603',
                subtotal: 1346,
                total: 1435,
                total_discounts: 160,
                total_taxes: 249,
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
