import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import ItemSummary from './ItemSummary'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { mockLineItems } from '@/test'
import { ThemeProvider } from '@itsrever/design-system'

describe('Item summary test', () => {
    afterEach(cleanup)

    it('should render icon, title and product previews', () => {
        const items = mockLineItems().filter((li) => li.type === 'product')
        render(
            <Router>
                <ThemeProvider>
                    <I18nextProvider i18n={i18n}>
                        <ItemSummary products={items} />
                    </I18nextProvider>
                </ThemeProvider>
            </Router>
        )
        screen.getByTestId('SellOutlinedIcon')
        screen.getByText('Items')

        expect(screen.getAllByTestId('ProductPreview').length).toBe(2)
    })
})
