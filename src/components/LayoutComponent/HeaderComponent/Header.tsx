import React from 'react'
import { Toolbar, Box } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import NavBarBurgerMenu from '../SharedComponents/NavBarBurgerMenu'
import UserMenu from '../SharedComponents/UserMenu'
import logoWide from '../../../assets/images/icons/logoWide.svg'
import { styled } from '@mui/material/styles'
import LanguageSwitcher from '../../LanguageSwitcher'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { toggleSidebar } from '../../../redux/features/appState/appStateSlice'
import { useTheme } from '@itsrever/design-system'
import DrawerComponent from './DrawerComponent/Drawer'
import { FlagrEvalPost } from '../../../services/flagr.api'

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

const Header = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isSidebarOpen = useAppSelector(
        (store) => store.appState.isSidebarOpen
    )
    // Feature flag to control if the analytics menu is shown
    const [showAnalytics, setShowAnalytics] = React.useState(false)
    React.useEffect(() => {
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

    return (
        <Box
            data-testid="Header"
            sx={{ display: 'flex', height: '6.5%', alignContent: 'center' }}
        >
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
                            className="cursor-pointer"
                            onClick={() => navigate('/')}
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
            <DrawerComponent showAnalytics={showAnalytics} />
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

export default Header
