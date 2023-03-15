import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import TitlesSplitLineItem from './TitlesSplitLineItem'
import { BrowserRouter as Router } from 'react-router-dom'
import i18n from '@/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import ReturnedIcon from '@mui/icons-material/Cached'

describe('Titles for Split Line item tests', () => {
    afterEach(cleanup)

    it('should display the correct titles for columns', () => {
        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <TitlesSplitLineItem />
                </I18nextProvider>
            </Router>
        )
        screen.getByText('Image')
        screen.getByText('Product name')
        screen.getByText('Price')
        screen.getByText('Status')
    })

    it('should display the title and icon passed by props', () => {
        render(
            <Router>
                <I18nextProvider i18n={i18n}>
                    <TitlesSplitLineItem
                        title="Title"
                        icon={<ReturnedIcon />}
                    />
                </I18nextProvider>
            </Router>
        )
        screen.getByText('Title')
        screen.getByTestId('CachedIcon')
    })
})
