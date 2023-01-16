import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import { LanguageSwitcher, languageLabels } from './LanguageSwitcher'
import i18n from '../../i18nForTests'
import { I18nextProvider } from 'react-i18next'

describe('Language Switcher Component', () => {
    afterEach(cleanup)

    it('should render title correctly', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <LanguageSwitcher />
            </I18nextProvider>
        )
        screen.getByText('EN')
    })

    it('should open when clicked', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <LanguageSwitcher />
            </I18nextProvider>
        )
        expect(screen.queryByText('English')).toBeNull()

        const title = screen.getByTestId('LanguageSwitcher')
        fireEvent.click(title)

        screen.getByText('English')
    })

    it('should have as many options as languages available', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <LanguageSwitcher />
            </I18nextProvider>
        )
        const switcher = screen.getByTestId('LanguageSwitcher')
        fireEvent.click(switcher)
        Object.entries(languageLabels).forEach((label) => {
            screen.getByText(label[1])
        })
    })

    it('should have as many options as languages available', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <LanguageSwitcher />
            </I18nextProvider>
        )
        const switcher = screen.getByTestId('LanguageSwitcher')
        fireEvent.click(switcher)
        Object.entries(languageLabels).forEach((label) => {
            screen.getByText(label[1])
        })
    })
})
