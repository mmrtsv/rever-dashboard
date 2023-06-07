import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import ProductsTab from './ProductsTab'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@itsrever/design-system'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mockReduxStore } from '@/test'
import { mockProcess } from '@/test'

describe('Products Tab test', () => {
    afterEach(cleanup)
    const state = mockReduxStore()
    const mockStore = configureStore()
    const store = mockStore(state)

    it('should render the returned items', () => {
        render(
            <Router>
                <Provider store={store}>
                    <ThemeProvider>
                        <I18nextProvider i18n={i18n}>
                            <ProductsTab
                                process={mockProcess()}
                                reviewMode={false}
                            />
                        </I18nextProvider>
                    </ThemeProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('CachedIcon')
        screen.getByText('Returned items')
        expect(screen.getAllByTestId('SplitLineItem').length).toBe(2)
    })

    it('should render not received products (in case there are)', () => {
        const process = addNotReceivedItems(mockProcess())
        render(
            <Router>
                <Provider store={store}>
                    <ThemeProvider>
                        <I18nextProvider i18n={i18n}>
                            <ProductsTab process={process} reviewMode={false} />
                        </I18nextProvider>
                    </ThemeProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('SearchOffIcon')
        screen.getByText('Not received items')
    })
})

function addNotReceivedItems(process: ModelsPublicReturnProcess) {
    if (process.line_items) {
        process.line_items[0].product_return_reason = 'NOT_RECEIVED'
    }
    return process
}
