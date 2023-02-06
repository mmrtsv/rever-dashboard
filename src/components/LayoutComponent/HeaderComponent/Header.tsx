import React from 'react'
import { Toolbar, Box } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
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

// const handleChangeSelectedEcommerce = () => {
//     //do nothing
// }

const Header = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()

    const isSidebarOpen = useAppSelector(
        (store) => store.generalData.drawerOpen
    )

    const handleDrawer = () => {
        dispatch(toggleDrawer())
    }

    return (
        <Box
            data-testid="Header"
            sx={{ display: 'flex', height: '60px', alignContent: 'center' }}
        >
            {' '}
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
                                className="mr-4"
                                style={{ color: theme.colors.primary.dark }}
                            >
                                <MenuIcon
                                    onClick={handleDrawer}
                                    fontSize="large"
                                />
                            </div>
                        )}
                    </div>
                    <LanguageSwitcher />
                </ReverToolbar>
            </ReverNavbar>
            <DrawerComponent />
        </Box>
    )
}

export default Header

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
