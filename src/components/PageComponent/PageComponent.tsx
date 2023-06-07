import React from 'react'
import styled from 'styled-components'
import { moreThan } from '@/utils'
import { useAppSelector } from '../../redux/hooks'
import { drawerWidth } from '../../layout/HeaderComponent/DrawerComponent/Drawer'

type Props = {
    children?: React.ReactNode
}

const PageComponent: React.FC<Props> = ({ children }) => {
    const isSidebarOpen = useAppSelector(
        (store) => store.generalData.drawerOpen
    )

    return (
        <ReverMain
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
    drawerWidth: string
}
const ReverMain = styled.div<ReverMainProps>`
    background-color: #f2f2f2; // #eee;
    height: calc(100vh - 80px);
    @media ${moreThan.lg} {
        margin-left: ${(props) =>
            props.isSideBarOpen ? `${drawerWidth}px` : 0};
    }
`
