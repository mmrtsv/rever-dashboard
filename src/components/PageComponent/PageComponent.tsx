import React from 'react'
import styled from 'styled-components'
import device from '../../utils/device'
import { useAppSelector } from '../../redux/hooks'
import { useTheme } from '@itsrever/design-system'
import { drawerWidth } from '../LayoutComponent/HeaderComponent/DrawerComponent/Drawer'

type Props = {
    children?: React.ReactNode
}

const PageComponent: React.FC<Props> = ({ children }) => {
    const theme = useTheme()
    const isSidebarOpen = useAppSelector(
        (store) => store.appState.isSidebarOpen
    )

    return (
        <ReverMain
            bgColor={theme.colors.grey[4]}
            data-testid="PageComponent"
            isSideBarOpen={isSidebarOpen}
            drawerWidth={drawerWidth.toString()}
        >
            {children}
        </ReverMain>
    )
}

export default PageComponent

interface ReverMainProps {
    isSideBarOpen: boolean
    bgColor: string
    drawerWidth: string
}
const ReverMain = styled.div<ReverMainProps>`
    background-color: ${(p) => p.bgColor};
    height: 93.5%;
    // over 600px
    @media ${device.lg} {
        margin-left: ${(props) =>
            props.isSideBarOpen ? `${drawerWidth}px` : 0};
    }
`
