import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'

export interface NavBarBurgerMenuProps {
    onClick?: () => void
    disabled?: boolean
}
const NavBarBurgerMenu: React.FC<NavBarBurgerMenuProps> = ({
    onClick,
    disabled = false
}) => {
    return (
        <>
            <MenuIcon
                data-testid="NavBarBurgerMenu"
                onClick={onClick}
                fontSize="large"
                style={disabled ? { cursor: 'auto' } : { cursor: 'pointer' }}
            />
        </>
    )
}

export default NavBarBurgerMenu