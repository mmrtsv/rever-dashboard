import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import LineItemsTable from './LineItemsTable'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

// TBD: Find how to add responses to calls to mock items mapped

describe('Line Items table tests', () => {
    const middlewares = [thunk]
    afterEach(cleanup)

    it('should render the titles and pagination', () => {
        const state = reduxState()
        const mockStore = configureStore(middlewares)
        const store = mockStore(state)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <LineItemsTable
                            currentTab={0}
                            freeText={''}
                            actualPage={0}
                            setActualPage={() => null}
                        />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        // Titles
        screen.getByText('Return date')

        // Pagination
        screen.getByText('10 / page')
    })
})

function reduxState() {
    return {
        tokenData: {
            token: 'xxxx'
        },
        lineItemsApi: {
            getLineItems: {
                loading: 'idle',
                response: { next: '', rowcount: 17, line_items: [] }
            },
            getPendingLineItems: {
                loading: 'idle',
                response: { next: '', rowcount: 17, line_items: [] }
            },
            getCompletedLineItems: {
                loading: 'idle',
                response: { next: '', rowcount: 17, line_items: [] }
            }
        },
        generalData: {
            selectedECommerce: undefined
        }
    }
}
