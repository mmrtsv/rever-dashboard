import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../redux/hooks'

type Props = {
    children?: React.ReactNode
}

const PageComponent: React.FC<Props> = ({ children }) => {
    const isSidebarOpen = useAppSelector(
        (store) => store.appState.isSidebarOpen
    )
    return (
        <ReverMain data-testid="PageComponent" isSidebarOpen={isSidebarOpen}>
            {children}
        </ReverMain>
    )
}
interface ReverMainProps {
    isSidebarOpen: boolean
}
const ReverMain = styled.div<ReverMainProps>`
    /* width: 100%; */
    height: 100%;
    margin-left: ${(props) => (props.isSidebarOpen ? '240px' : 0)};
`

export default PageComponent
