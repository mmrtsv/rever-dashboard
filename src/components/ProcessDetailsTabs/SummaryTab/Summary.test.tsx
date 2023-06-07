import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import Summary from './Summary'
import { BrowserRouter as Router } from 'react-router-dom'
import { mockProcess } from '@/test'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18nForTests'
import { ThemeProvider } from '@itsrever/design-system'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'

describe('Summary test', () => {
    afterEach(cleanup)

    it('should display the refund summary and item summary', () => {
        const process = mockProcess()
        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <Summary process={process} />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        screen.getByText('Summary')
        screen.getByText('Items')
    })

    it('should display exchange summary if there are exchanged items', () => {
        const process = addExchangeOrderNumber(mockProcess())
        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <Summary process={process} />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        screen.getByText('Exchanges')
    })
})

function addExchangeOrderNumber(process: ModelsPublicReturnProcess) {
    process.exchange_order_number = '123'
    return process
}
