import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@itsrever/design-system'
import thunk from 'redux-thunk'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import i18n from '../../i18nForTests'
import { I18nextProvider } from 'react-i18next'

import LineItemDetails from '../../pages/LineItemDetails.page'

describe('Line Items Details Page', () => {
    const retLineItem: ModelsPublicReturnLineItem = {
        name: 'OREGANO HOOD GREEN - M',
        return_process: {
            customer_printed_order_id: '#166558',
            customer: {
                first_name: 'David',
                last_name: 'Overflow',
                email: 'david.overflow@itsrever.com'
            },
            pickup_address: {
                address_line_1: 'Francesc Macia',
                address_line_2: '6to piso',
                city: 'Barcelona',
                postcode: '08017',
                country: 'Spain'
            }
        },
        product: {
            images: undefined
        }
    }

    const loggedInState = {
        authApi: {
            login: { loading: 'idle', response: {} }
        },
        userData: {
            user: {
                name: 'admin@partner.com',
                avatar: 'https://cdn-icons-png.flaticon.com/512/187/187134.png',
                role: 'admin',
                group: 'REVER'
            }
        },
        appState: {
            isSidebarOpen: false
        },
        tokenData: {
            token: 'xxxx'
        },
        lineItemsApi: {
            getLineItem: {
                loading: 'idle',
                response: { rowcount: 1, line_items: [retLineItem] }
            }
        },
        groupsApi: {
            getGroupCommerces: {
                response: {},
                loading: 'idle'
            }
        },
        generalData: {
            group: 'nudeproject',
            ecommerceList: ['nudeproject']
        }
    }

    const middlewares = [thunk]
    const mockStore = configureStore(middlewares)
    let store
    afterEach(cleanup)

    it('should be loading if not returned item', () => {
        store = mockStore(loggedInState)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider>
                            <LineItemDetails />
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        screen.getByAltText('REVER')
        screen.getByTestId('spinner')
    })

    // it('should render the left column correctly', () => {
    //     store = mockStore(loggedInState)
    //     render(
    //         <Router>
    //             <Provider store={store}>
    //                 <ThemeProvider>
    //                     <LineItemDetails />
    //                 </ThemeProvider>
    //             </Provider>
    //         </Router>
    //     )
    //     screen.getByAltText('ProductImage')
    //     screen.getByText('#166558')
    //     screen.getByText('David Overflow')
    //     screen.getByText('david.overflow@itsrever.com')
    //     screen.getByText('Francesc Macia')
    //     screen.getByText('6to piso')
    //     screen.getByText('Barcelona, 08017, Spain')
    //     screen.getByTestId('ReturnDate')
    //     screen.getAllByText('Pending')
    // })
})
