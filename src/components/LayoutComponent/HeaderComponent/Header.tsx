import React from 'react'
import { Hidden, Toolbar } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
// import styled from 'styled-components'
import NavBarBurgerMenu from '../SharedComponents/NavBarBurgerMenu'
import UserMenu from '../SharedComponents/UserMenu'
import logoWide from '../../../assets/images/icons/logoWide.svg'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import HomeIcon from '@mui/icons-material/Store'
import OrdersIcon from '@mui/icons-material/Sell'
import AnalyticsIcon from '@mui/icons-material/BarChart'
import LanguageSwitcher from '../../LanguageSwitcher'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { toggleSidebar } from '../../../redux/features/appState/appStateSlice'

export const drawerList1 = [
    { en: 'Home', es: 'Inicio' },
    { en: 'Dashboard', es: 'Tablero' }
]

export const drawerList2 = [{ en: 'Orders', es: 'Pedidos' }]

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}))

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const isSidebarOpen = useAppSelector(
        (store) => store.appState.isSidebarOpen
    )
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleDrawerOpen = () => {
        // setOpenDrawer(true)
        dispatch(toggleSidebar())
    }

    const handleDrawerClose = () => {
        // setOpenDrawer(false)
        dispatch(toggleSidebar())
    }
    const navigateMenuOnClick = (text: string) => {
        switch (text) {
            case 'Home':
                navigate('/')
                break
            case 'Orders':
                navigate('/orders')
                break
            default:
                break
        }
    }
    return (
        <Box data-testid="Header" sx={{ display: 'flex' }}>
            <ReverNavbar
                id="rever-navbar"
                position="fixed"
                open={isSidebarOpen}
                sx={{ backgroundColor: 'white', color: '#24446D' }}
            >
                <ReverToolbar>
                    <div className="flex flex-1 px-1">
                        <div data-testid="DrawerOutLogo">
                            {!isSidebarOpen && (
                                <Hidden lgDown>
                                    <NavBarBurgerMenu
                                        onClick={handleDrawerOpen}
                                    />
                                </Hidden>
                            )}
                            <Hidden lgUp>
                                <NavBarBurgerMenu onClick={handleDrawerOpen} />
                            </Hidden>
                        </div>

                        <img
                            data-testid="ReverLogo"
                            src={logoWide}
                            alt="logo"
                            className="ml-4"
                        />
                    </div>

                    <LanguageSwitcher />
                    <div className="mx-2 flex h-full items-center overflow-x-auto ">
                        <UserMenu />
                    </div>
                </ReverToolbar>
            </ReverNavbar>
            <ReverDrawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: '#24446D'
                    }
                }}
                variant="persistent"
                anchor="left"
                open={isSidebarOpen}
            >
                <DrawerHeader data-testid="DrawerInLogo">
                    <IconButton onClick={handleDrawerClose}>
                        <div style={{ color: 'white' }}>
                            <NavBarBurgerMenu />
                        </div>
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{ color: 'white' }}>
                    {['Home', 'Dashboard'].map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={() => navigateMenuOnClick(text)}
                            >
                                <ListItemIcon>
                                    {text === 'Home' && (
                                        <div style={{ color: 'white' }}>
                                            <HomeIcon />
                                        </div>
                                    )}
                                    {text === 'Dashboard' && (
                                        <div style={{ color: 'white' }}>
                                            <AnalyticsIcon />
                                        </div>
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List sx={{ color: 'white' }}>
                    {['Orders'].map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={() => navigateMenuOnClick(text)}
                            >
                                <ListItemIcon>
                                    {text === 'Orders' && (
                                        <div style={{ color: 'white' }}>
                                            <OrdersIcon />
                                        </div>
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </ReverDrawer>
        </Box>
    )
}

const ReverNavbar = styled(AppBar)`
    display: flex;
    position: relative;
    z-index: 20;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`
const ReverToolbar = styled(Toolbar)`
    padding: 0;
    min-height: 3.8rem;

    align-items: center;
    @media (min-width: 900px) {
        min-height: 4rem;
    }
`
const ReverDrawer = styled(Drawer)`
    border: solid red 1px;
`

export default Header
