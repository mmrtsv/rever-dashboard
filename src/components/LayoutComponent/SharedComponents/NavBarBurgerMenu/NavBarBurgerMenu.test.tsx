import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'

import NavBarBurgerMenu from './NavBarBurgerMenu'

describe('NavBarBurgerMenu testing', () => {
    afterEach(cleanup)

    it('should render', () => {
        render(<NavBarBurgerMenu />)
        screen.getByTestId('NavBarBurgerMenu')
    })
})
