import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import Loading from './Loading'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@itsrever/design-system'

describe('Loading', () => {
    afterEach(cleanup)

    it('should display ReverLogo and a spinner', () => {
        render(
            <Router>
                <ThemeProvider>
                    <Loading loading={true} />
                </ThemeProvider>
            </Router>
        )
        screen.getByAltText('REVER')
        screen.getByTestId('spinner')
    })

    it('should display ReverLogo and a spinner', () => {
        render(
            <Router>
                <ThemeProvider>
                    <Loading loading={true} />
                </ThemeProvider>
            </Router>
        )
        screen.getByAltText('REVER')
        screen.getByTestId('spinner')
    })
})
