import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import ShippingStatus, { ShippingStatuses } from './ShippingStatus'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'

describe('Shipping Status test', () => {
    afterEach(cleanup)

    it('should render the correct shipping status depending on the input', () => {
        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    {ShippingStatuses.map((_, i) => (
                        <ShippingStatus key={i} status={i} />
                    ))}
                </I18nextProvider>
            </Router>
        )
        screen.getByText('Label Pending')
        screen.getByText('Label Ready')
        screen.getByText('Collected')
        screen.getByText('In Warehouse')
        screen.getByText('Error')
        screen.getByText('Canceled')
    })
})
