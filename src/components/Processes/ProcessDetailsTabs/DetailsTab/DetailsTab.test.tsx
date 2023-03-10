import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import DetailsTab from './DetailsTab'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@itsrever/design-system'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import { Provider } from 'react-redux'

describe('Details tab tests', () => {
    afterEach(cleanup)

    it('should render the customer information and shipping status', () => {
        const state = reduxState()
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <Provider store={store}>
                    <ThemeProvider>
                        <I18nextProvider i18n={i18n}>
                            <DetailsTab />
                        </I18nextProvider>
                    </ThemeProvider>
                </Provider>
            </Router>
        )

        // Customer info
        screen.getByText('Customer')

        screen.getByText('Name')
        screen.getByText('Philip Swalus')
        screen.getByText('Email')
        screen.getByText('philipswalus@gmail.com')
        screen.getByText('Phone')
        screen.getByText('672173408')

        screen.getByText('Address')
        screen.getByText('Francesc Macia 3')
        screen.getByText('Barcelona, 08029, Spain')

        // Order Status
        screen.getByTestId('AccessTimeIcon')
        screen.getByText('Order status')

        screen.getByText('Order')
        screen.getByText('ID')
        screen.getByText('Status')

        screen.getByText('Shipping status')
        screen.getByText('REVER123')
        screen.getByText('In Warehouse')

        expect(screen.queryByText('Return Status')).toBeNull()
    })

    it('should render the return status when process is completed or review required', () => {
        const state = reduxState('COMPLETED')
        const mockStore = configureStore()
        const store = mockStore(state)

        render(
            <Router>
                <Provider store={store}>
                    <ThemeProvider>
                        <I18nextProvider i18n={i18n}>
                            <DetailsTab />
                        </I18nextProvider>
                    </ThemeProvider>
                </Provider>
            </Router>
        )
        screen.getByText('Return status')
        screen.getByText('retp_XXX')
        screen.getByText('Completed')
    })
})

function reduxState(returnStatus?: string) {
    return {
        processesApi: {
            getProcess: {
                response: {
                    processes: mockProcesses(returnStatus)
                }
            }
        }
    }
}

function mockProcesses(returnStatus?: string): ModelsPublicReturnProcess[] {
    return [
        {
            process_id: 'retp_XXX',
            tracking_id: 'REVER123',
            tracking_url: 'http://xxxx',
            customer_printed_order_id: 'ES-39352',
            return_status: returnStatus,
            customer: {
                email: 'philipswalus@gmail.com',
                first_name: 'Philip',
                last_name: 'Swalus'
            },
            drop_off_address: {
                phone: '672173408',
                address_line_1: 'Francesc Macia 3',
                country: 'Spain',
                postcode: '08029',
                city: 'Barcelona'
            },
            last_known_shipping_status: 3
        }
    ]
}
