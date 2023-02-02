import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import LineItemStatus from './LineItemStatus'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'

describe('Line Item Status tests', () => {
    afterEach(cleanup)

    it('should display the correct information for each status', () => {
        // 0 -> ACCEPTED
        // 1 -> DECLINED
        // 2 -> MISSING

        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <LineItemStatus status={0} />
                    <LineItemStatus status={1} />
                    <LineItemStatus status={2} />
                </I18nextProvider>
            </Router>
        )
        // ACCEPTED
        screen.getByTestId('SuccessIcon')
        screen.getByText('Accepted')

        // DECLINED
        screen.getByTestId('ErrorIcon')
        screen.getByText('Declined')

        // MISSING
        screen.getByTestId('SearchIcon')
        screen.getByText('Missing')
    })
})
