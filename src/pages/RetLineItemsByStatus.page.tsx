import React, { useEffect, useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import RetLineItemStatusCard from '../components/RetLineItemStatusCard'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import {
    getCompletedLineItems,
    getPendingLineItems,
    resetProcessesApiCalls
} from '../redux/api/processesApi'

function OrdersByStatus() {
    const dispatch = useAppDispatch()

    const processesApiPendingLineItems = useAppSelector(
        (store) => store.processesApi.getPendingLineItems
    )
    const processesApiCompletedLineItems = useAppSelector(
        (store) => store.processesApi.getCompletedLineItems
    )

    const [pendingLineItems, setPendingLineItems] = useState<
        ModelsPublicReturnLineItem[] | undefined
    >([])
    const [completedLineItems, setCompletedLineItems] = useState<
        ModelsPublicReturnLineItem[] | undefined
    >([])

    const [pagination, setPagination] = useState(0)

    useEffect(() => {
        dispatch(
            getPendingLineItems({
                offset: pagination * 20,
                limit: 5
            })
        )
        dispatch(
            getCompletedLineItems({
                offset: 0,
                limit: 5
            })
        )
    }, [pagination])

    useEffect(() => {
        if (processesApiPendingLineItems.loading === 'succeeded') {
            if (
                pendingLineItems &&
                processesApiPendingLineItems.response.line_items
            ) {
                setPendingLineItems(
                    pendingLineItems.concat(
                        processesApiPendingLineItems.response.line_items
                    )
                )
            } else
                setPendingLineItems(
                    processesApiPendingLineItems.response.line_items
                )
            dispatch(resetProcessesApiCalls())
        } else if (processesApiPendingLineItems.loading === 'failed') {
            dispatch(resetProcessesApiCalls())
        }
    }, [
        processesApiPendingLineItems.response,
        processesApiPendingLineItems.loading
    ])

    useEffect(() => {
        if (processesApiCompletedLineItems.loading === 'succeeded') {
            setCompletedLineItems(
                processesApiCompletedLineItems.response.line_items
            )
            dispatch(resetProcessesApiCalls())
        } else if (processesApiCompletedLineItems.loading === 'failed') {
            dispatch(resetProcessesApiCalls())
        }
    }, [
        processesApiCompletedLineItems.response,
        processesApiCompletedLineItems.loading
    ])

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
                            Pending to Receive
                            {pendingLineItems &&
                                ' (' +
                                    processesApiPendingLineItems.response
                                        .rowcount +
                                    ')'}
                        </Title>
                        <CardsDiv>
                            {pendingLineItems &&
                                pendingLineItems.map((retLineItem, i) => {
                                    return (
                                        <RetLineItemStatusCard
                                            key={i}
                                            lineItem={retLineItem}
                                        />
                                    )
                                })}
                            <div className="mt-4 flex justify-center">
                                <FetchMoreLink
                                    onClick={() =>
                                        setPagination(pagination + 1)
                                    }
                                    color="#63a2f4"
                                >
                                    and{' '}
                                    {processesApiPendingLineItems.response
                                        .rowcount &&
                                        pendingLineItems &&
                                        processesApiPendingLineItems.response
                                            .rowcount -
                                            pendingLineItems?.length}{' '}
                                    more...
                                </FetchMoreLink>
                            </div>
                        </CardsDiv>
                    </PendingToReceive>
                    <Completed>
                        <Title>
                            Completed
                            {completedLineItems &&
                                ' (' +
                                    processesApiCompletedLineItems.response
                                        .rowcount +
                                    ')'}
                        </Title>
                        <CardsDiv>
                            {completedLineItems &&
                                completedLineItems.map((retLineItem, i) => {
                                    return (
                                        <RetLineItemStatusCard
                                            key={i}
                                            lineItem={retLineItem}
                                        />
                                    )
                                })}
                            <div className="mt-4 flex justify-center">
                                <FetchMoreLink color="#63a2f4">
                                    and 50 more...
                                </FetchMoreLink>
                            </div>
                        </CardsDiv>
                    </Completed>
                </TableDiv>
            </MainDiv>
        </PageComponent>
    )
}

export default OrdersByStatus

interface FechtMoreLinkProps {
    color?: string
}
const FetchMoreLink = styled.a<FechtMoreLinkProps>`
    color: ${(props) => props.color};
    cursor: pointer;
`

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

const CardsDiv = styled.div`
    overflow-y: scroll;
    max-height: 65vh;
    ::-webkit-scrollbar {
        display: none;
    }
`
