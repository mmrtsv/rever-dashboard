import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import LineItem from './LineItem'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'

// TBD: Test navigation
// TBD: Add Cypress visibility tests : screen >= 900px & 600px <= screen < 900 & screen < 600

describe('Line Item test', () => {
    afterEach(cleanup)

    it('should display the correct information', () => {
        const item: ModelsPublicReturnLineItem = lineItem(1)

        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <LineItem key={1} lineItem={item} />
                </I18nextProvider>
            </Router>
        )
        // Date
        screen.getByText('January 31, 2023')

        // Order ID
        screen.getByText('ES-179615')

        // Image
        screen.getByAltText('ProductImage')

        // Quantity
        screen.getByText('1')

        // Line Item Name
        screen.getByText('BEAR HOOD - XS')

        // Name of the customer
        screen.getByText('Oskar Lozano')

        // Shipping Status
        screen.getByText('In Warehouse')
    })

    it('should display the review status when conditions are met', () => {
        // CONDITIONS
        // last_known_shipping_status = "IN_WAREHOUSE"
        // refund_timing = "ON_ITEM_VERIFIED"
        // status = "COMPLETED"
        // Item paid with opm

        const item: ModelsPublicReturnLineItem = lineItem(2)

        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <LineItem
                        key={1}
                        lineItem={item}
                        refundTiming={3}
                        orderStatus={2}
                    />
                </I18nextProvider>
            </Router>
        )
        screen.getByTestId('SuccessIcon')
        screen.getByText('Accepted')
    })
})

function lineItem(refundMethod: number): ModelsPublicReturnLineItem {
    const lineItem: ModelsPublicReturnLineItem = {
        action: 1,
        comment: '',
        id: '',
        name: 'BEAR HOOD - XS',
        pending_purchase: false,
        product: undefined,
        product_id: '7368369995937',
        quantity: 1,
        refund_payment_method: refundMethod,
        return_process: {
            customer_printed_order_id: 'ES-179615',
            customer: {
                first_name: 'Oskar',
                last_name: 'Lozano'
            },
            started_at: { nanos: 764216000, seconds: 1675179369 },
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
    return lineItem
}
