import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18nForTests'
import ShippingStatus, { ShippingStatuses } from './ShippingStatus'

describe('ShippingStatus test', () => {
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
        screen.getByText('NO SHIPPING STATUS')
        screen.getByText('CREATED')
        screen.getByText('COLLECTED')
        screen.getByText('IN WAREHOUSE')
        screen.getByText('ERROR')
        screen.getByText('CANCELLED')
    })
})
