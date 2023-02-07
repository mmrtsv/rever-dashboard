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
import LogoWideWhite from '@/assets/images/icons/LogoWideWhite.svg'
import { useTheme } from '@itsrever/design-system'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { toggleDrawer } from '@/redux/features/generalData/generalDataSlice'
import { useTranslation } from 'react-i18next'
import { FlagrEvalPost } from '@/services/flagr.api'
import { useAuth0 } from '@auth0/auth0-react'
import { resetTokenData } from '@/redux/api/userApi'
import Mixpanel from '@/mixpanel/Mixpanel'
import SelectorComponent from '@/components/SelectorComponent/SelectorComponent'

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
        (store) => store.generalData.drawerOpen
    )
    const group = useAppSelector(
        (store) => store.userApi.getMe.response.user?.group
    )

    const { logout, user } = useAuth0()
    const userName = user?.name?.match(/([^@]+)/) ?? ''

    // Feature flag to control if the analytics menu is shown
    const [showAnalytics, setShowAnalytics] = useState(true)
    const [showFinancials, setShowFinancials] = useState(false)
    const [showReturns, setShowReturns] = useState(false)
    const [drawerList3, setDrawerList3] = useState<Array<string>>([])
    const updateDrawerList = () => {
        if (showFinancials || showReturns) {
            setShowAnalytics(true)
            const newDrawerList: string[] = []
            newDrawerList.push('analytics')
            if (showFinancials) newDrawerList.push('financials')
            if (showReturns) newDrawerList.push('returns-analytics')

            return newDrawerList
        } else {
            setShowAnalytics(false)
            return []
        }
    }
    useEffect(() => {
        const updatedList = updateDrawerList()
        setDrawerList3(updatedList)
    }, [showFinancials, showReturns])
    useEffect(() => {
        const fetchFlagr = async (group: string) => {
            try {
                const response: any = await FlagrEvalPost({
                    flagID: 37,
                    entityContext: { group: group }
                })
                if (response.variantKey) {
                    setShowFinancials(response.variantKey === 'on')
                }
            } catch (error: any) {
                console.error(error)
            }
        }
        group && fetchFlagr(group)
    }, [group])
    useEffect(() => {
        const fetchFlagr = async (group: string) => {
            try {
                const response: any = await FlagrEvalPost({
                    flagID: 38,
                    entityContext: { group: group }
                })
                if (response.variantKey) {
                    setShowReturns(response.variantKey === 'on')
                }
            } catch (error: any) {
                console.error(error)
            }
        }
        group && fetchFlagr(group)
    }, [group])

    const handleDrawer = () => {
        dispatch(toggleDrawer())
    }

    const handleLogout = () => {
        dispatch(resetTokenData())
        logout({ returnTo: window.location.origin })
        Mixpanel.track('Logout')
    }
    const handleChangeSelectedEcommerce = () => {
        //do nothing
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
                navigate('/financials')
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
                                            <h6 className="text-lg">
                                                <b>
                                                    {t(`drawer_pages.${text}`)}
                                                </b>
                                            </h6>
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

                                                    {text ===
                                                        'returns-analytics' && (
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
                                                <h6 className="text-lg">
                                                    {t(`drawer_pages.${text}`)}
                                                </h6>
                                            </ListItemButton>
                                        </Collapse>
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    )}
                    <Divider />
                </div>
                {showAnalytics && (
                    <div className="flex w-full justify-center">
                        <SelectorComponent
                            handleChangeSelectedEcommerce={
                                handleChangeSelectedEcommerce
                            }
                        />
                    </div>
                )}
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
                                <h6 data-testid="UserName">{userName[0]}</h6>
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
