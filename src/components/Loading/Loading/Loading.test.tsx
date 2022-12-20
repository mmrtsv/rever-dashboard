import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import Loading from './Loading'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18nForTests'
import { ThemeProvider } from '@itsrever/design-system'

describe('Loading', () => {
    afterEach(cleanup)

    it('should display ReverLogo and a spinner', () => {
        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ThemeProvider>
                        <Loading loading={true} />
                    </ThemeProvider>
                </I18nextProvider>
            </Router>
        )
        screen.getByAltText('REVER')
        screen.getByTestId('spinner')
    })
})
