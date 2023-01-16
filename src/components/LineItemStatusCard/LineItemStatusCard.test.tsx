import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'

import LineItemByStatus from './LineItemStatusCard'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18nForTests'

describe('LineItemsStatusCard', () => {
    afterEach(cleanup)

    it('should display order ID, product image and product name', () => {
        const item = lineItem()

        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <LineItemByStatus lineItem={item} />
                </I18nextProvider>
            </Router>
        )
        screen.getByText('Order ID:')
        screen.getAllByAltText('ProductImage')
        screen.getByText('BEAR HOOD - XS')
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
        quantity: 1,
        refund_payment_method: 1,
        return_process: {
            customer_printed_order_id: '#179615',
            customer: {
                first_name: 'Oskar',
                last_name: 'Lozano'
            }
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
