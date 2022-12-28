import React from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'

function Home() {
    return (
        <PageComponent>
            <MainDiv>
                <TopDiv>
                    <div>
                        <h1>Analytics Dashboard</h1>
                        <h6>Monitor metrics - Check reports</h6>
                    </div>
                </TopDiv>
            </MainDiv>
        </PageComponent>
    )
}

export default Home

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    height: 100%;
`

const TopDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`
