import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import ProcessSplitLineItem from './ProcessSplitLineItem'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import {
    ModelsMoneyFormat,
    ModelsPublicReturnLineItem
} from '@itsrever/dashboard-api'

// TBD: Test navigation

describe('Process Split Line Item tests', () => {
    afterEach(cleanup)

    it('should display the correct information', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 599
        })

        const item: ModelsPublicReturnLineItem = lineItem()
        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ProcessSplitLineItem
                        lineItem={item}
                        moneyFormat={moneyFormat()}
                    />
                </I18nextProvider>
            </Router>
        )
        screen.getByAltText('ProductImage')
        screen.getByText('59,00 €')
        screen.getByText('In Warehouse')
        screen.getByText('BEAR HOOD - XS')
    })

    it('should display the review status when conditions are met', () => {
        // CONDITIONS
        // process.return_status = COMPLETED

        const item: ModelsPublicReturnLineItem = lineItem()

        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ProcessSplitLineItem
                        key={1}
                        lineItem={item}
                        returnStatus={'COMPLETED'}
                        moneyFormat={moneyFormat()}
                    />
                </I18nextProvider>
            </Router>
        )
        screen.getByTestId('SuccessIcon')
        screen.getByText('Accepted')
    })
})

function moneyFormat() {
    const mf: ModelsMoneyFormat = {
        amount_multiplied_by: 100,
        currency_symbol: '€',
        decimal_separator: ',',
        visible_number_of_decimals: 2
    }
    return mf
}

function lineItem(): ModelsPublicReturnLineItem {
    const lineItem: ModelsPublicReturnLineItem = {
        reviews: [{ status: 'APPROVED' }],
        action: 1,
        name: 'BEAR HOOD - XS',
        quantity: 1,
        return_process: {
            started_at: { nanos: 764216000, seconds: 1675179369 },
            last_known_shipping_status: 3
        },
        total: 5900,
        variant_id: '41927678361761',
        variant_name: 'XS'
    }
    return lineItem
}
