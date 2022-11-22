import React from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import returnedLineItemsJSON from '../assets/returnedLineItems.json'

const OrdersByStatus = () => {
    const pendingItems = returnedLineItemsJSON.lineItems.filter((lineItem) => {
        return lineItem.process.last_known_shipping_status === 0
    })
    const completedItems = returnedLineItemsJSON.lineItems.filter(
        (lineItem) => {
            return lineItem.process.last_known_shipping_status === 1
        }
    )

    return (
        <PageComponent>
            <MainDiv>
                <TopDiv>
                    <p>Overview</p>
                    <p>BUSCADOR</p>
                </TopDiv>
                <TableDiv>
                    <PendingToReceive>
                        <Title>
                            Pending to Receive {'(' + pendingItems.length + ')'}
                        </Title>
                        {pendingItems.map((retLineItem, i) => {
                            return (
                                <LineItemCard key={i}>
                                    {retLineItem.name}
                                </LineItemCard>
                            )
                        })}
                    </PendingToReceive>
                    <Completed>
                        <Title>
                            Completed {'(' + completedItems.length + ')'}
                        </Title>
                        {completedItems.map((retLineItem, i) => {
                            return (
                                <LineItemCard key={i}>
                                    {retLineItem.name}
                                </LineItemCard>
                            )
                        })}
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
    align-items: center;
    padding-left: 4rem;
    padding-right: 4rem;
    margin-top: 2rem;
`

const TopDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

const TableDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    width: 70%;
`

const PendingToReceive = styled.div`
    margin-top: 3rem;
`

const Completed = styled.div`
    margin-top: 3rem;
`

const Title = styled.h6`
    display: flex;
    justify-content: center;
    border: 1px solid;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    padding: 1rem;
    background-color: rgb(235, 238, 245);
    color: rgb(115, 118, 132);
`

const LineItemCard = styled.div`
    margin-top: 0.5rem;
    padding: 1rem;
    border: 1px solid;
    border-radius: 6px;
`
