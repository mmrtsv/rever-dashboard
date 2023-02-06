import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import DetailsTab from './DetailsTab'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@itsrever/design-system'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'

describe('Details tab tests', () => {
    afterEach(cleanup)

    it('should render the order statuses and customer information', () => {
        const process = mockOrder(0)

        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <DetailsTab process={process} />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        // Order Status
        screen.getByTestId('AccessTimeIcon')
        screen.getByText('Order status')

        screen.getByText('Order')
        screen.getByText('Shipping status')

        screen.getByText('Status')
        screen.getByTestId('SuccessIcon')
        screen.getByText('In warehouse')

        expect(screen.queryByText('Review status')).toBeNull()
        expect(screen.queryByText('Reviewed')).toBeNull()

        // Customer info
        screen.getByText('Customer')

        screen.getByText('Name')
        screen.getByText('Philip Swalus')
        screen.getByText('Email')
        screen.getByText('philipswalus@gmail.com')
        screen.getByText('Phone')
        screen.getByText('672173408')

        screen.getByText('Address')
        screen.getByText('Francesc Macia 3')
        screen.getByText('Barcelona, 08029, Spain')
    })

    it('should render the review status when conditions are met', () => {
        // last_known_shipping_status = IN_WAREHOUSE
        // Refund timing = ON ITEM VERIFIED
        // At least 1 item is paid with original Pm
        const process = mockOrder(3)

        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <DetailsTab process={process} />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        // Order Status
        screen.getByText('Review status')
        screen.getByText('Reviewed')
    })
})

function mockOrder(refundTiming: number): ModelsPublicReturnProcess {
    return {
        customer_printed_order_id: 'ES-39352',
        customer: {
            email: 'philipswalus@gmail.com',
            first_name: 'Philip',
            last_name: 'Swalus',
            rever_id: 'cust_2KE2bR5GqvDlEhaSYpLyDooKfnh'
        },
        drop_off_address: {
            phone: '672173408',
            address_line_1: 'Francesc Macia 3',
            country: 'Spain',
            postcode: '08029',
            city: 'Barcelona'
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
