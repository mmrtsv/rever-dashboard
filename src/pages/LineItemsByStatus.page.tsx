import React, { useCallback, useEffect, useRef, useState } from 'react'
import PageComponent from '../components/PageComponent'
import styled from '@emotion/styled'
import LineItemStatusCard from '../components/LineItemStatusCard'
import useSearchCompletedLineItems from '../hooks/useSearchCompletedLineItems'
import useSearchPendingLineItems from '../hooks/useSearchPendingLineItems'
import FilterComponent from '../components/FilterComponent'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@itsrever/design-system'

function OrdersByStatus() {
    const theme = useTheme()
    const { t } = useTranslation()

    const [pageNumPending, setPageNumPending] = useState(0)
    const [pageNumCompleted, setPageNumCompleted] = useState(0)
    const [freeText, setFreeText] = useState('')
    const { completedLineItems, totalCompleted } = useSearchCompletedLineItems(
        pageNumCompleted,
        freeText
    )
    const { pendingLineItems, totalPending } = useSearchPendingLineItems(
        pageNumPending,
        freeText
    )

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

    useEffect(() => {
        setPageNumPending(0)
        setPageNumCompleted(0)
    }, [freeText])

    return (
        <PageComponent>
            <MainDiv>
                <TopDiv>
                    <FilterComponent
                        freeText={freeText}
                        setFreeText={setFreeText}
                    />
                </TopDiv>
                <TableDiv>
                    <PendingToReceive>
                        <Title
                            className="text-xl"
                            borderColor={theme.colors.grey[3]}
                        >
                            {t('status_page.pending_title')}
                            {totalPending && '     (' + totalPending + ')'}
                        </Title>
                        <CardsDiv data-testid="PendingLineItems">
                            {pendingLineItems &&
                                pendingLineItems.map((retLineItem, i) => {
                                    if (pendingLineItems.length === i + 1) {
                                        return (
                                            <div
                                                key={i}
                                                ref={lastPendingLineItemRef}
                                            >
                                                <LineItemStatusCard
                                                    lineItem={retLineItem}
                                                />
                                            </div>
                                        )
                                    }
                                    return (
                                        <LineItemStatusCard
                                            key={i}
                                            lineItem={retLineItem}
                                        />
                                    )
                                })}
                        </CardsDiv>
                    </PendingToReceive>
                    <Completed>
                        <Title
                            className="text-xl"
                            borderColor={theme.colors.grey[3]}
                        >
                            {t('status_page.completed_title')}
                            {totalCompleted && ' (' + totalCompleted + ')'}
                        </Title>
                        <CardsDiv data-testid="CompletedLineItems">
                            {completedLineItems &&
                                completedLineItems.map((retLineItem, i) => {
                                    if (completedLineItems.length === i + 1) {
                                        return (
                                            <div
                                                key={i}
                                                ref={lastCompletedLineItemRef}
                                            >
                                                <LineItemStatusCard
                                                    lineItem={retLineItem}
                                                />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <LineItemStatusCard
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

const TableDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    width: 70%;
    /* overflow-y: scroll; */
`

const PendingToReceive = styled.div`
    margin-top: 1rem;
`

const Completed = styled.div`
    margin-top: 1rem;
`

interface TitleProps {
    borderColor: string
}

const Title = styled.div<TitleProps>`
    display: flex;
    justify-content: center;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    border-radius: 4px;
    padding: 1rem;
    background-color: rgb(235, 238, 245);
    color: 'black';
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 0px 0.5px;
`

const CardsDiv = styled.div`
    overflow-y: scroll;
    max-height: 65vh;
    ::-webkit-scrollbar {
        display: none;
    }
`
