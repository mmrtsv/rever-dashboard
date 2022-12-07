import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'

import LineItemByStatus from './RetLineItemStatusCard'
import returnedLineItemsJSON from '../../assets/returnedLineItems.json'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'

describe('LineItemsByStatus', () => {
    const retLineItem = returnedLineItemsJSON.lineItems[0]

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
            isSidebarOpen: true
        }
    }

    afterEach(cleanup)

    const mockStore = configureStore()
    let store
    // not working

    // it('should display order ID, product image and product name', () => {
    //     store = mockStore(loggedInState)
    //     render(
    //         <Router>
    //             <Provider store={store}>
    //                 <LineItemByStatus lineItem={retLineItem} />
    //             </Provider>
    //         </Router>
    //     )
    //     screen.getAllByText('Order ID:')
    //     screen.getAllByAltText('ProductImage')
    //     screen.getAllByTestId('ProductName')
    // })
})
