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
import { resetUserData } from '../../../../redux/features/userData/userDataSlice'

const UserMenu = () => {
    const UserData = useAppSelector((store) => store.userData.user)
    const settings = ['Account', 'Logout']
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
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
        // console.log(setting)
        switch (setting) {
            case 'Logout':
                handleLogout()
                break
            case 'Account':
                console.log('/account')
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
                    <Hidden lgDown>
                        <a className="mr-2">{UserData?.name}</a>
                    </Hidden>

                    <IconButton sx={{ p: 0, color: 'white' }}>
                        {UserData?.avatar ? (
                            <Avatar alt="avatar" src={UserData?.avatar} />
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
                {settings.map((setting) => (
                    <MenuItem
                        key={setting}
                        onClick={() => handleSelectSetting(setting)}
                    >
                        {setting === 'Logout' ? (
                            <LogoutIcon className="mr-2" />
                        ) : null}
                        {setting === 'Account' ? (
                            <AccountCircle className="mr-2" />
                        ) : null}
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default UserMenu
