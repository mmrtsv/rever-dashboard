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
import ItemsIcon from '@mui/icons-material/Sell'
import AnalyticsIcon from '@mui/icons-material/BarChart'
import FinancialsIcon from '@mui/icons-material/Payments'
import ReturnsIcon from '@mui/icons-material/LocalShipping'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import MenuIcon from '@mui/icons-material/Menu'
import OrdersIcon from '@mui/icons-material/Rule'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import Transit from '@mui/icons-material/AirlineStops'
import LogoWideWhite from '@/assets/images/icons/LogoWideWhite.svg'
import { useTheme } from '@itsrever/design-system'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { toggleDrawer } from '@/redux/features/generalData/generalDataSlice'
import { useTranslation } from 'react-i18next'
import { useAuth0 } from '@auth0/auth0-react'
import { resetTokenData } from '@/redux/api/userApi'
import Mixpanel from '@/mixpanel/Mixpanel'
import DrawerItem from './DrawerItem/DrawerItem'
import { FlagrEvalPost } from '@/services/flagr.api'

export const drawerWidth = 240
export const drawerList1 = ['returns', 'items']
export const drawerList2 = [
    'analytics',
    'financials',
    'returns-analytics',
    'transit-analytics'
]

export interface DrawerProps {
    showAnalytics: boolean
}

const DrawerComponent = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const [analyticsOpen, setAnalyticsOpen] = useState(true)

    const isSidebarOpen = useAppSelector(
        (store) => store.generalData.drawerOpen
    )

    const { logout, user } = useAuth0()
    const userName = user?.name?.match(/([^@]+)/) ?? ''

    const handleDrawer = () => {
        dispatch(toggleDrawer())
    }

    const handleLogout = () => {
        dispatch(resetTokenData())
        logout({ logoutParams: { returnTo: window.location.origin } })
        Mixpanel.track('Logout')
    }

    const group = useAppSelector(
        (store) => store.userApi.getMe.response.user?.group
    )

    const [showFinancials, setShowFinancials] = useState(false)
    const [showTransit, setShowTransit] = useState(false)

    useEffect(() => {
        let ignore = false
        const fetchFlagr = async (group: string) => {
            try {
                const responseFinancials: any = await FlagrEvalPost({
                    flagID: 37,
                    entityContext: { group: group }
                })
                const responseTransit: any = await FlagrEvalPost({
                    flagID: 100,
                    entityContext: { group: group }
                })
                if (responseFinancials.variantKey) {
                    setShowFinancials(responseFinancials.variantKey === 'on')
                }
                if (responseTransit.variantKey) {
                    setShowTransit(responseFinancials.variantKey === 'on')
                }
            } catch (error: any) {
                console.error(error)
            }
        }
        if (group && !ignore) fetchFlagr(group)
        return () => {
            ignore = true
        }
    }, [group])

    const drawerList3 = drawerList2.filter((elem) => {
        if (elem === 'financials') {
            if (showFinancials) return elem
        } else if (elem === 'transit-analytics') {
            if (showTransit) return elem
        } else {
            return elem
        }
    })

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
            <div className="flex h-[80px] w-full items-center justify-between p-2">
                <img
                    className="cursor-pointer"
                    src={LogoWideWhite}
                    alt="ReverLogo"
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
                                <DrawerItem
                                    icon={
                                        text === 'returns' ? (
                                            <OrdersIcon />
                                        ) : (
                                            <ItemsIcon />
                                        )
                                    }
                                    text={text}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List sx={{ color: theme.colors.common.white }}>
                        {drawerList3.map((text, i) => (
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
                                        <p className="text-lg">
                                            {t(`drawer_pages.${text}`)}
                                        </p>
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
                                        <DrawerItem
                                            icon={
                                                text === 'financials' ? (
                                                    <FinancialsIcon />
                                                ) : text ===
                                                  'transit-analytics' ? (
                                                    <Transit />
                                                ) : (
                                                    <ReturnsIcon />
                                                )
                                            }
                                            text={text}
                                        />
                                    </Collapse>
                                )}
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
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
                                <p data-testid="UserName">{userName[0]}</p>
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
