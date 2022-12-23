import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import LoadingModal from './LoadingModal'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18nForTests'
import { ThemeProvider } from '@itsrever/design-system'

describe('Loading', () => {
    afterEach(cleanup)

    it('should render a modal with a spinner', () => {
        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ThemeProvider>
                        <LoadingModal loading={true} />
                    </ThemeProvider>
                </I18nextProvider>
            </Router>
        )
        screen.getByTestId('modal')
        screen.getByTestId('spinner')
    })
})
