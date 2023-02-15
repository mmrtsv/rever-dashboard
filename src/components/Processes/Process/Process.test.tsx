import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import Process from './Process'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18nForTests'

// TBD: Test navigation
// TBD: Add Cypress visibility tests : screen >= 900px & 600px <= screen < 900 & screen < 600

describe('Process test', () => {
    afterEach(cleanup)

    it('should display the correct information when ecommercesList > 1', () => {
        const process: ModelsPublicReturnProcess = mockOrder()

        const state = reduxState(['nude', 'artesta'])
        const mockStore = configureStore()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Process Process={process} />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByText('February 1, 2023')
        screen.getByText('ES-39352')
        screen.getByText('Amics de les arts')
        screen.getByText('1 item')
        screen.getByText('Philip Swalus')
        screen.getByText('In Warehouse')
    })

    it('should display the correct information when ecommercesList < 2', () => {
        const process: ModelsPublicReturnProcess = mockOrder()

        const state = reduxState(['nude'])
        const mockStore = configureStore()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Process Process={process} />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByText('February 1, 2023')
        screen.getByText('ES-39352')
        expect(screen.queryByText('Amics de les arts')).toBeNull()
        screen.getByText('1 item')
        screen.getByText('Philip Swalus')
        screen.getByText('In Warehouse')
    })

    it('should display review status when conditions met', () => {
        // CONDITIONS:
        // last_known_shipping_status = 'IN_WAREHOUSE'
        // refund_timing = 'ON_ITEM_VERIFIED'
        // status != 'FAILED' && status != 'ON_HOLD'
        // at least 1 item has been refunded with Original PM
        const process: ModelsPublicReturnProcess = mockOrder(3)

        const state = reduxState(['nude'])
        const mockStore = configureStore()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Process Process={process} />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('SuccessIcon')
        screen.getByText('Reviewed')
    })
})

function reduxState(ecommerces: string[]) {
    return {
        userApi: {
            getMe: {
                response: {
                    id: '1',
                    user: {
                        name: 'amigo.jeje@itsrever.com',
                        role: '',
                        group: 'artesta',
                        ecommerces: ecommerces
                    }
                },
                loading: 'idle'
            }
        }
    }
}

function mockOrder(refundTiming?: number): ModelsPublicReturnProcess {
    return {
        customer_printed_order_id: 'ES-39352',
        customer: {
            email: 'philipswalus@gmail.com',
            first_name: 'Philip',
            last_name: 'Swalus',
            rever_id: 'cust_2KE2bR5GqvDlEhaSYpLyDooKfnh'
        },
        started_at: { nanos: 423817000, seconds: 1675246610 },
        last_known_shipping_status: 3,
        refund_timing: refundTiming,
        ecommerce_id: 'Amics de les arts',
        line_items: [
            {
                action: 2,
                comment: '',
                id: '',
                name: 'Travel to Barcelona - Sin marco / 30x40 / No',
                pending_purchase: false,
                product: undefined,
                product_id: '4433969250375',
                product_image_url:
                    'https://cdn.shopify.com/s/files/1/0007/5192/7347/products/013603_bf_7ca0bb3e-99aa-4bea-89e5-ce07916c5dfb.jpg?v=1579616399',
                product_return_reason: 'NOT_AS_EXPECTED',
                quantity: 1,
                refund_payment_method: 2,
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
            }
        ]
    }
}
