import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import ProcessDetailTabs from './ProcessDetailsTabs'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@itsrever/design-system'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mockReduxStore } from '@/test'

describe('Process detail tabs', () => {
    const state = mockReduxStore()
    const mockStore = configureStore()
    const store = mockStore(state)
    afterEach(cleanup)

    it('should render correct tabs', () => {
        render(
            <Router>
                <Provider store={store}>
                    <ThemeProvider>
                        <I18nextProvider i18n={i18n}>
                            <ProcessDetailTabs
                                process={{}}
                                reviewMode={false}
                            />
                        </I18nextProvider>
                    </ThemeProvider>
                </Provider>
            </Router>
        )
        screen.getByText('Products')
        screen.getByText('Details')
        screen.getByText('Summary')
    })
})
