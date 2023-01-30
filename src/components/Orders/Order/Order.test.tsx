import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import Order from './Order'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'

describe('Order test', () => {
    afterEach(cleanup)

    it('should display the correct information - ', () => {
        const process: ModelsPublicReturnProcess = mockOrder()

        render(
            <Router>
                <Order Order={process} />
            </Router>
        )
        screen.getByText('ES-39352')
        screen.getByText('Philip Swalus')
        screen.getByText('1 item')
        screen.getByText('In warehouse')
    })
})

function mockOrder(): ModelsPublicReturnProcess {
    return {
        customer_printed_order_id: 'ES-39352',
        customer: {
            email: 'philipswalus@gmail.com',
            first_name: 'Philip',
            last_name: 'Swalus',
            rever_id: 'cust_2KE2bR5GqvDlEhaSYpLyDooKfnh'
        },
        last_known_shipping_status: 3,
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
            }
        ]
    }
}
