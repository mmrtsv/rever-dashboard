import React from 'react'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled as styledM } from '@mui/material/styles'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { toggleDrawer } from '@/redux/features/generalData/generalDataSlice'
import { useTheme } from '@itsrever/design-system'
import DrawerComponent from './DrawerComponent/Drawer'
import SelectorComponent from '@/components/SelectorComponent/SelectorComponent'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const drawerWidth = 240

const AppBar = styledM(MuiAppBar, {
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

const Header = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const location = useLocation()

    const isSidebarOpen = useAppSelector(
        (store) => store.generalData.drawerOpen
    )

    const finalPathname = location.pathname.includes('/return/')
        ? '/return'
        : location.pathname

    return (
        <HeaderDiv data-testid="Header">
            <ReverNavbar
                id="rever-navbar"
                position="fixed"
                open={isSidebarOpen}
                sx={{
                    backgroundColor: theme.colors.common.white,
                    color: theme.colors.primary.main
                }}
            >
                <ToolBar>
                    <div className="flex flex-1 items-center px-1">
                        {!isSidebarOpen && (
                            <div
                                className="mr-4"
                                style={{ color: theme.colors.primary.dark }}
                            >
                                <MenuIcon
                                    onClick={() => dispatch(toggleDrawer())}
                                    fontSize="large"
                                />
                            </div>
                        )}
                        <h3 className="text-primary-dark">
                            {t(`page_titles.${finalPathname}`)}
                        </h3>
                    </div>
                    <div className="mr-2">
                        <SelectorComponent />
                    </div>
                    <LanguageSwitcher />
                </ToolBar>
            </ReverNavbar>
            <DrawerComponent />
        </HeaderDiv>
    )
}

export default Header

const HeaderDiv = styled.div`
    overflow-x: auto;
    height: 80px;
    border-bottom: solid 1px #ccc;
`

const ToolBar = styled.div`
    display: flex;
    align-items: center;
    height: 80px;
`

const ReverNavbar = styledM(AppBar)`
    overflow: hidden;
    display: flex;
    z-index: 20;
    box-shadow: 0 2px 3px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 0 1rem 0 1rem;
`
