import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18nForTests'
import { ThemeProvider } from '@itsrever/design-system'
import ExchangeSummary from './ExchangeSummary'
import { mockExchangedLineItems } from '@/test'

describe('Exchange summary test', () => {
    afterEach(cleanup)

    it('should display the title, information of the new order and new items', () => {
        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <ExchangeSummary
                            newOrderId="123123"
                            email="juanito@miamigo.com"
                            exchangedItems={mockExchangedLineItems()}
                        />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        screen.getByText('Exchanges')

        screen.getByText('New Order ID')
        screen.getByText('123123')

        screen.getByText('Email')
        screen.getByText('juanito@miamigo.com')

        screen.getByText('New Items')
        screen.getByText('Line Item 1')
        screen.getByText('Line Item 2')
    })
})
