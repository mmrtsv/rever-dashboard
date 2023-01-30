import React, { useState, useEffect } from 'react'
import {
    Drawer,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    List,
    Divider,
    Collapse
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Store'
import ItemsIcon from '@mui/icons-material/Sell'
import AnalyticsIcon from '@mui/icons-material/BarChart'
import FinancialsIcon from '@mui/icons-material/Payments'
import ReturnsIcon from '@mui/icons-material/LocalShipping'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import MenuIcon from '@mui/icons-material/Menu'
import OrdersIcon from '@mui/icons-material/Rule'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LogoWideWhite from '../../../../assets/images/icons/LogoWideWhite.svg'
import LogoutIcon from '@mui/icons-material/Logout'
import { useTheme } from '@itsrever/design-system'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks'
import { toggleSidebar } from '../../../../redux/features/appState/appStateSlice'
import { useTranslation } from 'react-i18next'
import { FlagrEvalPost } from '../../../../services/flagr.api'
import { useAuth0 } from '@auth0/auth0-react'
import { resetTokenData } from '../../../../redux/features/generalData/tokenDataSlice'
import Mixpanel from '../../../../mixpanel/Mixpanel'

export const drawerWidth = 240
export const drawerList1 = ['returns', 'items']
export const drawerList2 = ['analytics', 'financials', 'returns']

export interface DrawerProps {
    showAnalytics: boolean
}

const DrawerComponent = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const [analyticsOpen, setAnalyticsOpen] = useState(true)

    const isSidebarOpen = useAppSelector(
        (store) => store.appState.isSidebarOpen
    )

    const { logout, user } = useAuth0()
    const userName = user?.name?.match(/([^@]+)/) ?? ''

    // Feature flag to control if the analytics menu is shown
    const [showAnalytics, setShowAnalytics] = useState(false)
    useEffect(() => {
        const fetchFlagr = async () => {
            try {
                const response: any = await FlagrEvalPost({
                    flagID: 36
                })
                if (response.variantKey) {
                    setShowAnalytics(response.variantKey === 'on')
                }
            } catch (error: any) {
                console.error(error)
            }
        }
        fetchFlagr()
    }, [])

    const handleDrawer = () => {
        dispatch(toggleSidebar())
    }

    const handleLogout = () => {
        logout({ returnTo: window.location.origin })
        dispatch(resetTokenData())
        Mixpanel.track('Logout')
    }

    const navigateMenuOnClick = (text: string) => {
        switch (text) {
            case 'returns':
                navigate('/')
                break
            case 'items':
                navigate('/items')
                break
            case 'financials':
                navigate('/dashboard')
                break
            case 'returns-analytics':
                navigate('/returns-analytics')
                break
            default:
                break
        }
    }

    return (
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
                    backgroundColor: '#24446d'
                }
            }}
            variant="persistent"
            anchor="left"
            open={isSidebarOpen}
        >
            <div className="flex h-[60px] w-full items-center justify-between p-2">
                <img
                    className="cursor-pointer"
                    src={LogoWideWhite}
                    alt="logo"
                />
                <IconButton onClick={handleDrawer}>
                    <div
                        className="flex"
                        style={{ color: theme.colors.common.white }}
                    >
                        <MenuIcon fontSize="large" />
                    </div>
                </IconButton>
            </div>
            <Divider />
            <div className="flex h-full w-full flex-col justify-between">
                <div className="w-full">
                    <List sx={{ color: theme.colors.common.white }}>
                        {drawerList1.map((text) => (
                            <ListItem
                                key={text}
                                disablePadding
                                data-testid={text}
                            >
                                <ListItemButton
                                    onClick={() => navigateMenuOnClick(text)}
                                >
                                    <ListItemIcon>
                                        {text === 'returns' && (
                                            <div
                                                style={{
                                                    color: theme.colors.common
                                                        .white
                                                }}
                                            >
                                                <OrdersIcon />
                                            </div>
                                        )}
                                        {text === 'items' && (
                                            <div
                                                style={{
                                                    color: theme.colors.common
                                                        .white
                                                }}
                                            >
                                                <ItemsIcon />
                                            </div>
                                        )}
                                    </ListItemIcon>
                                    <h6 className="text-lg">
                                        <b>{t(`drawer_pages.${text}`)}</b>
                                    </h6>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    {showAnalytics && (
                        <List sx={{ color: theme.colors.common.white }}>
                            {drawerList2.map((text, i) => (
                                <ListItem
                                    key={text}
                                    disablePadding
                                    data-testid={text}
                                >
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
                                                            color: theme.colors
                                                                .common.white
                                                        }}
                                                    >
                                                        <AnalyticsIcon />
                                                    </div>
                                                )}
                                            </ListItemIcon>
                                            <p>{t(`drawer_pages.${text}`)}</p>
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
                                                                color: theme
                                                                    .colors
                                                                    .common
                                                                    .white
                                                            }}
                                                        >
                                                            <FinancialsIcon />
                                                        </div>
                                                    )}
                                                    {text === 'returns' && (
                                                        <div
                                                            style={{
                                                                color: theme
                                                                    .colors
                                                                    .common
                                                                    .white
                                                            }}
                                                        >
                                                            <ReturnsIcon />
                                                        </div>
                                                    )}
                                                </ListItemIcon>
                                                <p>
                                                    {t(`drawer_pages.${text}`)}
                                                </p>
                                            </ListItemButton>
                                        </Collapse>
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </div>
                <div className="w-full">
                    <List sx={{ color: theme.colors.common.white }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <div
                                        style={{
                                            color: theme.colors.common.white
                                        }}
                                    >
                                        <AccountCircle />
                                    </div>
                                </ListItemIcon>
                                <h6>{userName[0]}</h6>
                            </ListItemButton>
                            <ListItemIcon
                                style={{ cursor: 'pointer' }}
                                onClick={handleLogout}
                            >
                                <div
                                    style={{
                                        color: theme.colors.common.white
                                    }}
                                >
                                    <LogoutIcon />
                                </div>
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </div>
            </div>
        </Drawer>
    )
}

export default DrawerComponent
