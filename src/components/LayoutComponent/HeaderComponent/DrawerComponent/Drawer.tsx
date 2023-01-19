import React, { useState, useEffect } from 'react'
import {
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
import HomeIcon from '@mui/icons-material/Store'
import OrdersIcon from '@mui/icons-material/Sell'
import AnalyticsIcon from '@mui/icons-material/BarChart'
import FinancialsIcon from '@mui/icons-material/Payments'
import ReturnsIcon from '@mui/icons-material/LocalShipping'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import MenuIcon from '@mui/icons-material/Menu'
import { styled } from '@mui/material/styles'
import { useTheme } from '@itsrever/design-system'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks'
import { toggleSidebar } from '../../../../redux/features/appState/appStateSlice'
import { useTranslation } from 'react-i18next'
import { FlagrEvalPost } from '../../../../services/flagr.api'

export const drawerWidth = 240
export const drawerList1 = ['home', 'orders']
export const drawerList2 = ['analytics', 'financials', 'returns']

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}))

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
            <DrawerHeader>
                <IconButton onClick={handleDrawer}>
                    <div style={{ color: theme.colors.common.white }}>
                        <MenuIcon fontSize="large" />
                    </div>
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List sx={{ color: theme.colors.common.white }}>
                {drawerList1.map((text) => (
                    <ListItem key={text} disablePadding data-testid={text}>
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
                            <ListItemText primary={t(`drawer_pages.${text}`)} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            {showAnalytics && (
                <List sx={{ color: theme.colors.common.white }}>
                    {drawerList2.map((text, i) => (
                        <ListItem key={text} disablePadding data-testid={text}>
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
            )}
        </Drawer>
    )
}

export default DrawerComponent
