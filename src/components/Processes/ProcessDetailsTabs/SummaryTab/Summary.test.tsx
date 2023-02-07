import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import Summary from './Summary'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18nForTests'
import { ThemeProvider } from '@itsrever/design-system'
import { RefundTimings, ReturnStatus } from '@/redux/features/generalData/generalDataSlice'

describe('Process test', () => {
    afterEach(cleanup)

    it('should display all the line items in the process in RetProductLineItems', () => {
        const process: ModelsPublicReturnProcess = mockOrder()

        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <Summary process={process} />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        expect(screen.getAllByTestId('RetProductSummary').length).toBe(2)
    })

    it('should display the finance summary with: total price, costs, refunds to methods and final balance', () => {
        const process: ModelsPublicReturnProcess = mockOrder()

        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <Summary process={process} />
                    </I18nextProvider>
                </ThemeProvider>
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

    it('should display the finance summary with the approved items, if timing is ON_ITEM_VERIFIED and status is completed', () => {
        const process: ModelsPublicReturnProcess = mockOrderWithUpdatedSummary()

        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <Summary process={process} />
                    </I18nextProvider>
                </ThemeProvider>
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
        bank_transfer_refund_amount: 1000,
        total_refund_amount: 1500,
        ecommerce_id: 'Amics de les arts',
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
        line_items: [
            {
                action: 2,
                comment: '',
                id: '',
                name: 'Line Item 1',
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

function mockOrderWithUpdatedSummary(): ModelsPublicReturnProcess {
    let process = mockOrder(RefundTimings.OnItemVerified)
    process.status = ReturnStatus.Completed
    
    if (process?.line_items !== undefined) {
        process.approved_line_items = [
            process.line_items[0],
            process.line_items[2]
        ]
    }
    process.executed_bank_transfer = 600
    process.total_refund_amount = 935
    return process
}
