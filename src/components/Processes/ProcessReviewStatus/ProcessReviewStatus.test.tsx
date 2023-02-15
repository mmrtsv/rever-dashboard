import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import ReviewStatus from './ProcessReviewStatus'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'

describe('Process Review Status tests', () => {
    afterEach(cleanup)

    it('should display the correct information for each status', () => {
        // 0 -> Action Required
        // 1 -> Reviewed

        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ReviewStatus status={0} />
                    <ReviewStatus status={1} />
                </I18nextProvider>
            </Router>
        )
        // ACTION REQUIRED
        screen.getByTestId('AccessTimeIcon')
        screen.getByText('Action Required')

        // REVIEWED
        screen.getByTestId('SuccessIcon')
        screen.getByText('Reviewed')
    })
})
