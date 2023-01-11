import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18nForTests'
import Pagination from './Pagination'

describe('Pagination Component Test', () => {
    afterEach(cleanup)

    it('should render the correct amount of pages when there are less than 5', () => {
        const mockStore = configureStore()
        const store = mockStore()

        const pages = [1, 2, 3, 4]

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        {pages.map((page) => (
                            <Pagination
                                key={page}
                                actualPage={1}
                                setActualPage={() => null}
                                limit={25}
                                setLimit={() => null}
                                maxPage={page}
                            />
                        ))}
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        const ones = screen.getAllByText('1')
        screen.getByText('1 total pages')
        expect(ones.length).toBe(4)

        const twos = screen.getAllByText('2')
        screen.getByText('2 total pages')
        expect(twos.length).toBe(3)

        const thress = screen.getAllByText('3')
        screen.getByText('3 total pages')
        expect(thress.length).toBe(2)

        const fours = screen.getAllByText('4')
        screen.getByText('4 total pages')
        expect(fours.length).toBe(1)
    })

    it('should display 25 - 50 - 100 options when clicking on the limitter', () => {
        const mockStore = configureStore()
        const store = mockStore()

        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Pagination
                            actualPage={1}
                            setActualPage={() => null}
                            limit={25}
                            setLimit={() => null}
                            maxPage={5}
                        />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        const limitter = screen.getAllByRole('button')[0]
        fireEvent.mouseDown(limitter)
        screen.getAllByText('25 / page')
        screen.getAllByText('50 / page')
        screen.getAllByText('100 / page')
    })

    it('should change the limit when an option of the limitter is clicked', () => {
        const mockStore = configureStore()
        const store = mockStore()

        // const [limit, setLimit] = useState(25)
        render(
            <Router>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <Pagination
                            actualPage={1}
                            setActualPage={() => null}
                            limit={25}
                            setLimit={() => null}
                            maxPage={5}
                        />
                    </I18nextProvider>
                </Provider>
            </Router>
        )
        const limitter = screen.getAllByRole('button')[0]
        fireEvent.mouseDown(limitter)
        screen.getAllByText('25 / page')
    })
})
