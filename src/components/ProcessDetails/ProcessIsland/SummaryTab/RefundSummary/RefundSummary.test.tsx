import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18nForTests'
import { ThemeProvider } from '@itsrever/design-system'
import RefundSummary from './RefundSummary'
import { mockLineItems, mockMoneyFormat } from '@/test'

describe('Refund summary test', () => {
    afterEach(cleanup)

    it('should display title with icon, total refund, final balance and correct refund to payment methods', () => {
        const products = mockLineItems().filter(
            (item) => item.type === 'product'
        )
        const costs = mockLineItems().filter((item) => item.type === 'cost')

        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <RefundSummary
                            products={products}
                            costs={costs}
                            moneyFormat={mockMoneyFormat()}
                            bankTransferRefundAmount={1000}
                            originalRefundAmount={500}
                            giftCardRefundAmount={250}
                        />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        screen.getByTestId('PostAddIcon')
        screen.getByText('Summary')

        // Total sum of products returned
        screen.getByText('Total refund:')
        screen.getByText('15,00 €')

        screen.getByText('Shipping cost:')
        screen.getByText('5,00 €')

        screen.getByText('Bank transfer refund amount:')
        screen.getByText('10,00 €')

        screen.getByText('Original payment method refund amount:')
        screen.getByText('5,00 €')

        screen.getByText('Gift card refund amount:')
        screen.getByText('2,50 €')

        // Total sum of refunds to all payment methods (products - costs)
        screen.getByText('Final balance:')
        screen.getByText('17,50 €')
    })
})
