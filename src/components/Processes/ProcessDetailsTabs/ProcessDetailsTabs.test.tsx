import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import ProcessDetailTabs from './ProcessDetailsTabs'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@itsrever/design-system'

describe('Process detail tabs', () => {
    afterEach(cleanup)

    it('should render correct tabs', () => {
        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <ProcessDetailTabs
                            currentTab={0}
                            setCurrentTab={() => null}
                        />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        screen.getByText('Products')
        screen.getByText('Details')
        screen.getByText('Summary')
    })

    it('should render run setCurrentTab when a new tab is clicked', () => {
        const spyOnChangeTab = vi.fn()

        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <ProcessDetailTabs
                            currentTab={0}
                            setCurrentTab={spyOnChangeTab}
                        />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        fireEvent.click(screen.getByText('Details'))
        expect(spyOnChangeTab).toHaveBeenCalled()
    })
})
