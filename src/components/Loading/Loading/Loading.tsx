import React from 'react'
import { ClipLoader } from 'react-spinners'
import styled from '@emotion/styled'
import logoWide from '../../../assets/images/icons/logoWide.svg'
import { useTheme } from '@itsrever/design-system'

interface LoadingProps {
    loading: boolean
}

export const Loading: React.FC<LoadingProps> = ({ loading }) => {
    const theme = useTheme()

    return (
        <>
            {loading && (
                <ReverLoading>
                    <img className="mb-8" src={logoWide} alt="REVER" />
                    <ClipLoader
                        data-testid="spinner"
                        loading={loading}
                        size="125px"
                        color={theme.colors.primary.dark}
                    />
                </ReverLoading>
            )}
        </>
    )
}

export default Loading

const ReverLoading = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    align-items: center;
`
