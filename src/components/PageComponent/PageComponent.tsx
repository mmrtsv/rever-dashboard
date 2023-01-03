import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../redux/hooks'
import { useTheme } from '@itsrever/design-system'

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
            isSidebarOpen={isSidebarOpen}
        >
            {children}
        </ReverMain>
    )
}
interface ReverMainProps {
    isSidebarOpen: boolean
    bgColor: string
}
const ReverMain = styled.div<ReverMainProps>`
    background-color: ${(p) => p.bgColor};
    height: 93.5%;
    margin-left: ${(props) => (props.isSidebarOpen ? '240px' : 0)};
`

export default PageComponent
