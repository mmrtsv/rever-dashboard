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
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks'
import { logout } from '../../../../redux/api/authApi'
import { resetUserData } from '../../../../redux/features/generalData/userDataSlice'
import { useTranslation } from 'react-i18next'

export const userOptions = [
    { en: 'Account', es: 'Cuenta' },
    { en: 'Logout', es: 'Cerrar sesión' }
]

export const UserMenu = () => {
    const UserData = useAppSelector((store) => store.userData.user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { i18n } = useTranslation()
    const lang = i18n.language
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('user')
        dispatch(resetUserData())
        navigate('/login')
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
            <Tooltip title="Open settings">
                <div onClick={handleOpenUserMenu} style={{ cursor: 'pointer' }}>
                    <Hidden smDown>
                        <a className="mr-2">{UserData?.name}</a>
                    </Hidden>

                    <IconButton sx={{ p: 0, color: 'white' }}>
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
