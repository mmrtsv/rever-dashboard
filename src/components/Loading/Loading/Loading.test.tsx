import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import Loading from './Loading'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@itsrever/design-system'

describe('Loading', () => {
    afterEach(cleanup)

    it('should display ReverLogo and a spinner when loading = true', () => {
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

    it('should render nothing if loading = false', () => {
        render(
            <Router>
                <ThemeProvider>
                    <Loading loading={false} />
                </ThemeProvider>
            </Router>
        )
        expect(screen.queryByAltText('REVER')).toBeNull()
        expect(screen.queryByTestId('spinner')).toBeNull()
    })
})
