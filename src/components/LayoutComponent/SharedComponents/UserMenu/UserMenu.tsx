import React, { useState } from 'react'
import {
    Avatar,
    Box,
    Tooltip,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Hidden
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks'
import { useTranslation } from 'react-i18next'
import { useAuth0 } from '@auth0/auth0-react'
import { resetTokenData } from '../../../../redux/features/generalData/tokenDataSlice'

export const userOptions = [
    { en: 'Account', es: 'Cuenta' },
    { en: 'Logout', es: 'Cerrar sesión' }
]

export const UserMenu = () => {
    const dispatch = useAppDispatch()
    const { i18n } = useTranslation()

    const UserData = useAppSelector((store) => store.userData.user)
    const lang = i18n.language
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const { logout, user } = useAuth0()
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleLogout = () => {
        logout({ returnTo: window.location.origin })
        localStorage.removeItem('accessToken')
        dispatch(resetTokenData())
        // navigate('/login')
    }

    const handleSelectSetting = (setting: string) => {
        switch (setting) {
            case 'Logout':
                handleLogout()
                break
            case 'Account':
                break
            default:
                break
        }
        handleCloseUserMenu()
    }

    return (
        <Box data-testid="UserMenu" sx={{ flexGrow: 0 }}>
            <Tooltip title="Settings">
                <div onClick={handleOpenUserMenu} style={{ cursor: 'pointer' }}>
                    <Hidden smDown>
                        <a className="mr-2">{user && user.name}</a>
                    </Hidden>

                    <IconButton sx={{ p: 0 }}>
                        {UserData?.avatar ? (
                            <Avatar
                                data-testid="avatar"
                                alt="avatar"
                                src={UserData?.avatar}
                            />
                        ) : (
                            <AccountCircle fontSize="large" />
                        )}
                    </IconButton>
                </div>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {userOptions.map((option, i) => (
                    <MenuItem
                        key={i}
                        onClick={() => handleSelectSetting(option.en)}
                    >
                        {option.en === 'Logout' && (
                            <LogoutIcon className="mr-2" />
                        )}
                        {option.en === 'Account' && (
                            <AccountCircle className="mr-2" />
                        )}
                        <Typography textAlign="center">
                            {lang === 'en' ? option.en : option.es}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default UserMenu
