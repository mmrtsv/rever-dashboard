import React, { memo, useState } from 'react'
import {
    Toolbar,
    Box,
    Drawer,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    List,
    Divider,
    Collapse
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import NavBarBurgerMenu from '../SharedComponents/NavBarBurgerMenu'
import UserMenu from '../SharedComponents/UserMenu'
import logoWide from '../../../assets/images/icons/logoWide.svg'
import { styled } from '@mui/material/styles'
import HomeIcon from '@mui/icons-material/Store'
import OrdersIcon from '@mui/icons-material/Sell'
import AnalyticsIcon from '@mui/icons-material/BarChart'
import FinancialsIcon from '@mui/icons-material/Payments'
import ReturnsIcon from '@mui/icons-material/LocalShipping'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import LanguageSwitcher from '../../LanguageSwitcher'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { toggleSidebar } from '../../../redux/features/appState/appStateSlice'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@itsrever/design-system'

export const drawerList1 = ['home', 'orders']
export const drawerList2 = ['analytics', 'financials', 'returns']

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
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isSidebarOpen = useAppSelector(
        (store) => store.appState.isSidebarOpen
    )
    const handleDrawer = () => {
        dispatch(toggleSidebar())
    }

    const [analyticsOpen, setAnalyticsOpen] = useState(true)

    const navigateMenuOnClick = (text: string) => {
        switch (text) {
            case 'home':
                navigate('/')
                break
            case 'orders':
                navigate('/orders')
                break
            case 'financials':
                navigate('/dashboard')
                break
            case 'returns':
                navigate('/returns')
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
                sx={{
                    backgroundColor: theme.colors.common.white,
                    color: theme.colors.primary.main
                }}
            >
                <ReverToolbar>
                    <div className="flex flex-1 px-1">
                        {!isSidebarOpen && (
                            <div
                                data-testid="DrawerOutLogo"
                                className="mr-4"
                                style={{ color: theme.colors.primary.dark }}
                            >
                                <NavBarBurgerMenu onClick={handleDrawer} />
                            </div>
                        )}

                        <img
                            data-testid="ReverLogo"
                            src={logoWide}
                            alt="logo"
                        />
                    </div>

                    <LanguageSwitcher />
                    <div className="mx-2 flex h-full items-center overflow-x-auto ">
                        <UserMenu />
                    </div>
                </ReverToolbar>
            </ReverNavbar>
            <Drawer
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
                        backgroundColor: theme.colors.primary.dark
                    }
                }}
                variant="persistent"
                anchor="left"
                open={isSidebarOpen}
            >
                <DrawerHeader data-testid="DrawerInLogo">
                    <IconButton onClick={handleDrawer}>
                        <div style={{ color: theme.colors.common.white }}>
                            <NavBarBurgerMenu />
                        </div>
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{ color: theme.colors.common.white }}>
                    {drawerList1.map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={() => navigateMenuOnClick(text)}
                            >
                                <ListItemIcon>
                                    {text === 'home' && (
                                        <div
                                            style={{
                                                color: theme.colors.common.white
                                            }}
                                        >
                                            <HomeIcon />
                                        </div>
                                    )}
                                    {text === 'orders' && (
                                        <div
                                            style={{
                                                color: theme.colors.common.white
                                            }}
                                        >
                                            <OrdersIcon />
                                        </div>
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={t(`drawer_pages.${text}`)}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List sx={{ color: theme.colors.common.white }}>
                    {drawerList2.map((text, i) => (
                        <ListItem key={text} disablePadding>
                            {i === 0 && (
                                <ListItemButton
                                    onClick={() =>
                                        setAnalyticsOpen(!analyticsOpen)
                                    }
                                >
                                    <ListItemIcon>
                                        {text === 'analytics' && (
                                            <div
                                                style={{
                                                    color: theme.colors.common
                                                        .white
                                                }}
                                            >
                                                <AnalyticsIcon />
                                            </div>
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={t(`drawer_pages.${text}`)}
                                    />
                                    {analyticsOpen ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItemButton>
                            )}
                            {i > 0 && (
                                <Collapse
                                    in={analyticsOpen}
                                    timeout="auto"
                                    unmountOnExit
                                    sx={{ width: '100%' }}
                                >
                                    <ListItemButton
                                        sx={{ pl: 4 }}
                                        onClick={() =>
                                            navigateMenuOnClick(text)
                                        }
                                    >
                                        <ListItemIcon>
                                            {text === 'financials' && (
                                                <div
                                                    style={{
                                                        color: theme.colors
                                                            .common.white
                                                    }}
                                                >
                                                    <FinancialsIcon />
                                                </div>
                                            )}
                                            {text === 'returns' && (
                                                <div
                                                    style={{
                                                        color: theme.colors
                                                            .common.white
                                                    }}
                                                >
                                                    <ReturnsIcon />
                                                </div>
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={t(`drawer_pages.${text}`)}
                                        />
                                    </ListItemButton>
                                </Collapse>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
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

export default memo(Header)
