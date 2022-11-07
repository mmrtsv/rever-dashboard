import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import { LanguageSwitcher, languageLabels } from './LanguageSwitcher'

describe('Language Switcher Component', () => {
    afterEach(cleanup)

    it('should render title correctly', () => {
        render(<LanguageSwitcher />)
        screen.getByTestId('LanguageSwitcher')
    })

    it('should open when clicked', () => {
        render(<LanguageSwitcher />)
        const popover = screen.queryByTestId('Popover')
        expect(popover).toBeNull()

        const title = screen.getByTestId('LanguageSwitcher')
        fireEvent.click(title)

        expect(popover).toBeDefined()
    })

    it('should close when option selected', () => {
        render(<LanguageSwitcher />)
        const popover = screen.queryByTestId('Popover')
        expect(popover).toBeNull()

        const title = screen.getByTestId('LanguageSwitcher')
        fireEvent.click(title)

        const option = screen.getByText('English')
        fireEvent.click(option)

        expect(popover).toBeNull()
    })

    it('should have as many options as languages available', () => {
        render(<LanguageSwitcher />)
        const switcher = screen.getByTestId('LanguageSwitcher')
        fireEvent.click(switcher)
        Object.entries(languageLabels).forEach((label) => {
            screen.getByText(label[1])
        })
    })

    it('should display title in corresponding language', () => {
        render(<LanguageSwitcher />)
        const menu = screen.getByTestId('LanguageSwitcher')
        fireEvent.click(menu)

        const option = screen.getByText('English')
        fireEvent.click(option)

        screen.getByText('EN')
    })
})
