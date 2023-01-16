import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import PageComponent from './PageComponent'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@itsrever/design-system'

describe('Page Component test', () => {
    afterEach(cleanup)

    it('should render', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <ThemeProvider>
                        <PageComponent />
                    </ThemeProvider>
                </Provider>
            </Router>
        )
        screen.getByTestId('PageComponent')
    })
})

function reduxState() {
    return {
        appState: {
            isSidebarOpen: true
        }
    }
}
