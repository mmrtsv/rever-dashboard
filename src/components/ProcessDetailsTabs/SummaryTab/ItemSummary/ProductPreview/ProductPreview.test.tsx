import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import ProductPreview from './ProductPreview'
import { BrowserRouter as Router } from 'react-router-dom'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { mockLineItems } from '@/test'
import { RefundActions } from '@/utils'

describe('Product Preview test', () => {
    afterEach(cleanup)

    it('should render product image, product name, quantity, variant name and reason for refund', () => {
        const item = mockLineItems()[0]
        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ProductPreview product={item} />
                </I18nextProvider>
            </Router>
        )
        screen.getByAltText('ProductImage')
        screen.getByText('Line Item 1')
        screen.getByText('Quantity:')
        screen.getByText('1')
        screen.getByText('Variant 1')
        screen.getByText('Reason for refund:')
        screen.getByText('Different than expected')
    })

    it('should render reason for exchange if action === to exchange', () => {
        const item = exchangedLineItem(mockLineItems()[0])
        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ProductPreview product={item} />
                </I18nextProvider>
            </Router>
        )
        screen.getByText('Reason for exchange:')
        screen.getByText('Different than expected')
    })
})

function exchangedLineItem(lineItem: ModelsPublicReturnLineItem) {
    lineItem.action = RefundActions.ToExchange
    return lineItem
}
