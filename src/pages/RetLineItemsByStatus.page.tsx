import React, { useCallback, useRef, useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import RetLineItemStatusCard from '../components/RetLineItemStatusCard'
import useSearchCompletedLineItems from '../hooks/useSearchCompletedLineItems'
import useSearchPendingLineItems from '../hooks/useSearchPendingLineItems'

function OrdersByStatus() {
    const [pageNumPending, setPageNumPending] = useState(0)
    const [pageNumCompleted, setPageNumCompleted] = useState(0)
    const { completedLineItems, totalCompleted } =
        useSearchCompletedLineItems(pageNumCompleted)
    const { pendingLineItems, totalPending } =
        useSearchPendingLineItems(pageNumPending)

    // Logic for loading pending line items
    const hasMorePending =
        pendingLineItems &&
        totalPending &&
        totalPending - pendingLineItems.length > 0
    const pendingObserver = useRef<any>()
    const lastPendingLineItemRef = useCallback(
        (node: any) => {
            if (pendingObserver.current) pendingObserver.current.disconnect()
            pendingObserver.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMorePending) {
                    setPageNumPending((prev) => prev + 1)
                }
            })
            if (node) pendingObserver.current.observe(node)
        },
        [hasMorePending]
    )

    // Logic for loading completed line items
    const hasMoreCompleted =
        completedLineItems &&
        totalCompleted &&
        totalCompleted - completedLineItems.length > 0
    const completedObserver = useRef<any>()
    const lastCompletedLineItemRef = useCallback(
        (node: any) => {
            if (completedObserver.current)
                completedObserver.current.disconnect()
            completedObserver.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMoreCompleted) {
                    setPageNumCompleted((prev) => prev + 1)
                }
            })
            if (node) completedObserver.current.observe(node)
        },
        [hasMoreCompleted]
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
                            Pending to Receive
                            {pendingLineItems && ' (' + totalPending + ')'}
                        </Title>
                        <CardsDiv>
                            {pendingLineItems &&
                                pendingLineItems.map((retLineItem, i) => {
                                    if (pendingLineItems.length === i + 1) {
                                        return (
                                            <div
                                                key={i}
                                                ref={lastPendingLineItemRef}
                                            >
                                                <RetLineItemStatusCard
                                                    lineItem={retLineItem}
                                                />
                                            </div>
                                        )
                                    }
                                    return (
                                        <RetLineItemStatusCard
                                            key={i}
                                            lineItem={retLineItem}
                                        />
                                    )
                                })}
                        </CardsDiv>
                    </PendingToReceive>
                    <Completed>
                        <Title>
                            Completed
                            {completedLineItems && ' (' + totalCompleted + ')'}
                        </Title>
                        <CardsDiv>
                            {completedLineItems &&
                                completedLineItems.map((retLineItem, i) => {
                                    if (completedLineItems.length === i + 1) {
                                        return (
                                            <div
                                                key={i}
                                                ref={lastCompletedLineItemRef}
                                            >
                                                <RetLineItemStatusCard
                                                    lineItem={retLineItem}
                                                />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <RetLineItemStatusCard
                                                key={i}
                                                lineItem={retLineItem}
                                            />
                                        )
                                    }
                                })}
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
