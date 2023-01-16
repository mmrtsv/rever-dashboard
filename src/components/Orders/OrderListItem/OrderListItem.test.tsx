import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import OrderListItem from './OrderListItem'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'

describe('Order List Item test', () => {
    afterEach(cleanup)

    it('should display the correct information when availWidth >= 1024px', () => {
        const item: ModelsPublicReturnLineItem = lineItem()

        vi.spyOn(window.screen, 'availWidth', 'get').mockReturnValue(1024)

        render(
            <Router>
                <OrderListItem key={1} lineItem={item} />
            </Router>
        )

        // Render
        screen.getByTestId('OrderListItem')

        // Customer Printed Order ID
        screen.getByText('#179615')

        // Product Image
        screen.getByAltText('ProductImage')

        // Line Item Name
        screen.getByText('BEAR HOOD - XS')

        // Name of the customer
        screen.getByText('Oskar Lozano')

        // Shipping Status
        screen.getByTestId('shippingStatus')
    })

    it('should display the correct information when availWidth < 1024px', () => {
        const item: ModelsPublicReturnLineItem = lineItem()

        vi.spyOn(window.screen, 'availWidth', 'get').mockReturnValue(1023)

        render(
            <Router>
                <OrderListItem key={1} lineItem={item} />
            </Router>
        )

        // Render
        screen.getByTestId('OrderListItem')

        // Customer Printed Order ID
        screen.getByText('#179615')

        // Product Image
        screen.getByAltText('ProductImage')

        // Line Item Name
        expect(screen.queryByText('BEAR HOOD - XS')).toBeNull()

        // Name of the customer
        screen.getByText('Oskar Lozano')

        // Shipping Status
        screen.getByTestId('shippingStatus')
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
