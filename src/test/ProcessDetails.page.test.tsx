import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { afterEach, describe, it, vi } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@itsrever/design-system'
import thunk from 'redux-thunk'
import i18n from '../i18nForTests'
import { I18nextProvider } from 'react-i18next'
import ProcessDetails from '@/pages/ProcessDetails.page'
import { mockReduxStore, mockProcess } from '.'

const mockHook = { process: {}, loading: false }
vi.mock('@/hooks/useSearchProcess', () => ({
    useSearchProcess: () => {
        return mockHook
    }
}))

describe('Process Details Page testing', () => {
    const middlewares = [thunk]
    const mockStore = configureStore(middlewares)
    afterEach(cleanup)

    it('should render the correct elements - TopBar and details tabs', () => {
        const state = mockReduxStore()
        const store = mockStore(state)

        mockHook.process = mockProcess()
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <ProcessDetails />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        //Top Bar
        screen.getByTestId('LocalShippingOutlinedIcon')
        screen.getByText('ABC123')

        // Tabs
        screen.getByText('Products')
        screen.getByText('Details')
        screen.getByText('Summary')

        // Products
        screen.getByText('Line Item 1')
    })

    // it('should render the start review button if the process status is REVIEW_REQUIRED', () => {
    //     const state = mockReduxStore()
    //     const store = mockStore(state)

    //     mockHook.process = addReviewRequired(mockProcess())
    //     render(
    //         <Router>
    //             <Provider store={store}>
    //                 <I18nextProvider i18n={i18n}>
    //                     <ThemeProvider>
    //                         <ProcessDetails />
    //                     </ThemeProvider>
    //                 </I18nextProvider>
    //             </Provider>
    //         </Router>
    //     )
    //     // Button
    //     screen.getByTestId('EditIcon')
    //     screen.getByText('Review')
    // })
})
