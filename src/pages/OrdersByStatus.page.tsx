import React from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'

const OrdersByStatus = () => {
    return (
        <PageComponent>
            <MainDiv>
                <TopDiv>
                    <p>Overview</p>
                    <p>BUSCADOR</p>
                </TopDiv>
                <TableDiv>
                    <PendingToReceive>
                        <p>Pending to receive</p>
                    </PendingToReceive>
                    <Completed>
                        <p>Completed</p>
                    </Completed>
                </TableDiv>
            </MainDiv>
        </PageComponent>
    )
}

export default OrdersByStatus

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 4rem;
    padding-right: 4rem;
    margin-top: 2rem;
`

const TopDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const TableDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 2rem;
    margin-bottom: 1rem;
`

const PendingToReceive = styled.div``

const Completed = styled.div``
