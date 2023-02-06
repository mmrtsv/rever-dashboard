import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import Titles from './TitlesLI'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'

// TBD: test visibility on screen width -> Cypress?

describe('Line Item Titles tests', () => {
    afterEach(cleanup)

    it('should render all the titles', () => {
        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <Titles />
                </I18nextProvider>
            </Router>
        )
        screen.getByText('Return date')
        screen.getByTestId('ArrowDownwardIcon')
        screen.getByText('Order ID')
        screen.getByText('Image')
        screen.getByText('Quantity')
        screen.getByText('Product name')
        screen.getByText('Customer')
        screen.getByText('Status')
    })
})
