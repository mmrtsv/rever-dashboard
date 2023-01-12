import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import LoadingModal from './LoadingModal'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@itsrever/design-system'

describe('Loading', () => {
    afterEach(cleanup)

    it('should render a modal with a spinner if loading = true', () => {
        render(
            <Router>
                <ThemeProvider>
                    <LoadingModal loading={true} />
                </ThemeProvider>
            </Router>
        )
        screen.getByTestId('modal')
        screen.getByTestId('spinner')
    })

    it('should render nothing if loading = false', () => {
        render(
            <Router>
                <ThemeProvider>
                    <LoadingModal loading={false} />
                </ThemeProvider>
            </Router>
        )
        expect(screen.queryByTestId('modal')).toBeNull()
        expect(screen.queryByTestId('spinner')).toBeNull()
    })
})
