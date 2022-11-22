import React from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import returnedLineItemsJSON from '../assets/returnedLineItems.json'

const OrdersByStatus = () => {
    const returnedLineItems = returnedLineItemsJSON

    return (
        <PageComponent>
            <MainDiv>
                <TopDiv>
                    <p>Overview</p>
                    <p>BUSCADOR</p>
                </TopDiv>
                <TableDiv>
                    <PendingToReceive>
                        <h6>Pending to receive</h6>
                    </PendingToReceive>
                    <Completed>
                        <h6>Completed</h6>
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
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
`

const PendingToReceive = styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid red;
    width: 30%;
`

const Completed = styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid blue;
    width: 30%;
`
