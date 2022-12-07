import React from 'react'
import { ClipLoader } from 'react-spinners'
import styled from '@emotion/styled'
import logoWide from '../../../assets/images/icons/logoWide.svg'

interface LoadingProps {
    loading: boolean
}

export const Loading: React.FC<LoadingProps> = ({ loading }) => {
    return (
        <ReverLoading>
            <img className="mb-8" src={logoWide} alt="REVER" />
            <ClipLoader loading={loading} size="125px" color="#24446D" />
        </ReverLoading>
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