import React, { useEffect, useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import returnedLineItemsJSON from '../assets/returnedLineItems.json'
import RetLineItemStatusCard from '../components/RetLineItemStatusCard'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import { getLineItems, resetProcessesApiCalls } from '../redux/api/processesApi'

function OrdersByStatus() {
    const dispatch = useAppDispatch()
    const processesApi = useAppSelector((store) => store.processesApi)

    const [LineItems, setLineItems] = useState<
        ModelsPublicReturnLineItem[] | undefined
    >([])

    useEffect(() => {
        if (processesApi.getLineItems.loading === 'succeeded') {
            setLineItems(processesApi.getLineItems.response.line_items)
            dispatch(resetProcessesApiCalls())
        } else if (processesApi.getLineItems.loading === 'failed') {
            dispatch(resetProcessesApiCalls())
        }
    }, [processesApi.getLineItems.response, processesApi.getLineItems.loading])

    useEffect(() => {
        dispatch(getLineItems({ offset: 0, limit: 20 }))
    }, [])

    const pendingItems = LineItems?.filter((lineItem) => {
        const shippingStatus =
            lineItem.return_process?.last_known_shipping_status
        if (
            shippingStatus === 0 ||
            shippingStatus === 1 ||
            shippingStatus === 2
        )
            return lineItem
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
                            Pending to Receive{' '}
                            {pendingItems && '(' + pendingItems.length + ')'}
                        </Title>
                        {pendingItems &&
                            pendingItems.map((retLineItem, i) => {
                                return (
                                    <RetLineItemStatusCard
                                        key={i}
                                        lineItem={retLineItem}
                                    />
                                )
                            })}
                    </PendingToReceive>
                    <Completed>
                        <Title>
                            Completed {'(' + completedItems.length + ')'}
                        </Title>
                        {/* {completedItems.map((retLineItem, i) => {
                            return (
                                <RetLineItemStatusCard
                                    key={i}
                                    lineItem={retLineItem}
                                />
                            )
                        })} */}
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
    background-color: rgb(241, 245, 249);
    height: 100%;
    padding-top: 2rem;
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
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 1rem;
    background-color: rgb(235, 238, 245);
    color: rgb(115, 118, 132);
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 0px 0.5px;
`
