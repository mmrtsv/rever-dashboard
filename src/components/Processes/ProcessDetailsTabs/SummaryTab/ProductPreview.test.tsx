import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import ProductPreview from './ProductPreview'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'

describe('Product Preview test', () => {
    afterEach(cleanup)

    it('should render product image, product name, quantity, variant name and reason', () => {
        const item: ModelsPublicReturnLineItem = lineItem()

        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ProductPreview lineItem={item} />
                </I18nextProvider>
            </Router>
        )
        screen.getByAltText('ProductImage')
        screen.getByText('BEAR HOOD - XS')
        screen.getByText('Quantity:')
        screen.getByText('2')
        screen.getByText('XS')
    })
})

function lineItem(): ModelsPublicReturnLineItem {
    const lineItem: ModelsPublicReturnLineItem = {
        action: 1,
        comment: '',
        id: '',
        name: 'BEAR HOOD - XS',
        pending_purchase: false,
        product: undefined,
        product_id: '7368369995937',
        quantity: 2,
        refund_payment_method: 1,
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
