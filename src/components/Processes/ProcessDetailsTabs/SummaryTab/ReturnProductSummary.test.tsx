import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import ReturnProductSummary from './ReturnProductSummary'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'

describe('Return product summary test', () => {
    afterEach(cleanup)

    it('should render the Product Preview and reason of refund', () => {
        const item: ModelsPublicReturnLineItem = lineItem(0)

        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ReturnProductSummary LineItem={item} />
                </I18nextProvider>
            </Router>
        )
        screen.getByTestId('ProductPreview')
        screen.getByText('Reason for refund:')
        screen.getByText('Too small')
    })

    it('should render the Product Preview and reason of exchange', () => {
        const item: ModelsPublicReturnLineItem = lineItem(1)

        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ReturnProductSummary LineItem={item} />
                </I18nextProvider>
            </Router>
        )
        screen.getByTestId('ProductPreview')
        screen.getByText('Reason for exchange:')
        screen.getByText('Too small')
    })
})

function lineItem(action: number): ModelsPublicReturnLineItem {
    const lineItem: ModelsPublicReturnLineItem = {
        action: action,
        comment: '',
        id: '',
        name: 'BEAR HOOD - XS',
        pending_purchase: false,
        product: undefined,
        product_id: '7368369995937',
        quantity: 2,
        refund_payment_method: 1,
        product_return_reason: 'WRONG_SIZE_TOO_SMALL',
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
