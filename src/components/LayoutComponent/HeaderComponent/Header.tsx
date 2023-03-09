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

    const isSidebarOpen = useAppSelector(
        (store) => store.generalData.drawerOpen
    )

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
                    <div className="flex flex-1 px-1">
                        {!isSidebarOpen && (
                            <div style={{ color: theme.colors.primary.dark }}>
                                <MenuIcon
                                    onClick={() => dispatch(toggleDrawer())}
                                    fontSize="large"
                                />
                            </div>
                        )}
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
    display: flex;
    height: 60px;
    align-content: center;
    background-color: #fff;
`

const ToolBar = styled.div`
    display: flex;
    padding: 0 1rem 0 1rem;
    align-items: center;
    height: 60px;
`

const ReverNavbar = styledM(AppBar)`
    display: flex;
    position: relative;
    z-index: 20;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`
