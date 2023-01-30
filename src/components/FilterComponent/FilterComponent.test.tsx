import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { ThemeProvider } from '@itsrever/design-system'
import FilterComponent from './FilterComponent'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18nForTests'

describe('FilterComponent Test', () => {
    afterEach(cleanup)

    it('should render a Search Input', () => {
        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ThemeProvider>
                        <FilterComponent freeText="" setFreeText={() => null} />
                    </ThemeProvider>
                </I18nextProvider>
            </Router>
        )
        screen.getByLabelText('Search...')
    })

    it('should display the texts passed', () => {
        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <ThemeProvider>
                        <FilterComponent
                            freeText="TEST"
                            setFreeText={() => null}
                        />
                    </ThemeProvider>
                </I18nextProvider>
            </Router>
        )
        screen.getAllByDisplayValue('TEST')
    })
})
