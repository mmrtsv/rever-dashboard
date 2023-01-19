import React, { useCallback, useRef, useState, useEffect } from 'react'
import PageComponent from '../components/PageComponent'
import styled from 'styled-components'
import LineItemStatusCard from '../components/LineItemStatusCard'
import useSearchCompletedLineItems from '../hooks/useSearchCompletedLineItems'
import useSearchPendingLineItems from '../hooks/useSearchPendingLineItems'
import FilterComponent from '../components/FilterComponent'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@itsrever/design-system'
import useSearchMe from '../hooks/useSearchMe'
import SelectorComponent from '../components/SelectorComponent/SelectorComponent'

import { useAppSelector } from '../redux/hooks'
import device from '../utils/device'

function OrdersByStatus() {
    const theme = useTheme()
    const { t } = useTranslation()

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    const [pageNumPending, setPageNumPending] = useState(0)
    const [pageNumCompleted, setPageNumCompleted] = useState(0)
    const [freeText, setFreeText] = useState('')
    const { completedLineItems, totalCompleted } = useSearchCompletedLineItems(
        pageNumCompleted,
        freeText,
        selectedEcommerce
    )
    const { pendingLineItems, totalPending } = useSearchPendingLineItems(
        pageNumPending,
        freeText,
        selectedEcommerce
    )
    const { callMe } = useSearchMe()
    useEffect(() => {
        callMe()
    }, [])

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

    const handleChangeFreeText = (freeText: string) => {
        if (freeText.length === 0 || freeText.length > 2) {
            setPageNumPending(0)
            setPageNumCompleted(0)
        }
        setFreeText(freeText)
    }

    const handleChangeSelectedEcommerce = () => {
        setPageNumCompleted(0)
        setPageNumPending(0)
    }

    const BarOpen = useAppSelector((store) => store.appState.isSidebarOpen)

    return (
        <PageComponent>
            <MainDiv>
                <TopDiv>
                    <div className="flex flex-col">
                        <FilterComponent
                            freeText={freeText}
                            setFreeText={handleChangeFreeText}
                        />
                        {freeText.length > 2 && (
                            <span className="mt-2 text-xs">
                                {totalCompleted && totalPending
                                    ? t('orders_table.results') +
                                      (totalCompleted + totalPending)
                                    : t('orders_table.results') + '0'}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <SelectorComponent
                            handleChangeSelectedEcommerce={
                                handleChangeSelectedEcommerce
                            }
                        />
                    </div>
                </TopDiv>
                <TableDiv barOpen={BarOpen}>
                    <TitlesDiv>
                        <Title
                            className="text-xl"
                            borderColor={theme.colors.grey[3]}
                        >
                            {t('status_page.pending_title')}
                            {totalPending && '     (' + totalPending + ')'}
                        </Title>
                        <Title
                            className="text-xl"
                            borderColor={theme.colors.grey[3]}
                        >
                            {t('status_page.completed_title')}
                            {totalCompleted && ' (' + totalCompleted + ')'}
                        </Title>
                    </TitlesDiv>
                    <ItemsDiv>
                        <PendingToReceive>
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
                            <CardsDiv data-testid="CompletedLineItems">
                                {completedLineItems &&
                                    completedLineItems.map((retLineItem, i) => {
                                        if (
                                            completedLineItems.length ===
                                            i + 1
                                        ) {
                                            return (
                                                <div
                                                    key={i}
                                                    ref={
                                                        lastCompletedLineItemRef
                                                    }
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
                    </ItemsDiv>
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
`

const TopDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    width: 100%;
    @media ${device.lg} {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`

interface TableProps {
    barOpen: boolean
}

const TableDiv = styled.div<TableProps>`
    width: 100%;
    @media ${device.lg} {
        width: ${(p) => (p.barOpen ? '' : '860px')};
    }
    @media ${device.xl} {
        width: 860px;
    }
`

interface TableProps {
    barOpen: boolean
}

const TableDiv = styled.div<TableProps>`
    width: 100%;
    @media ${device.lg} {
        width: ${(p) => (p.barOpen ? '' : '860px')};
    }
    @media ${device.xl} {
        width: 860px;
    }
`

const TitlesDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    margin-top: 1rem;
    width: 100%;
`

const ItemsDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    width: fit-content;
    width: 100%;
`

const PendingToReceive = styled.div``

const Completed = styled.div``

interface TitleProps {
    borderColor: string
}

const Title = styled.div<TitleProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-color: ${(p) => p.borderColor};
    border-radius: 4px;
    padding: 1rem;
    background-color: rgb(235, 238, 245);
    color: 'black';
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 0px 0.5px;
    text-align: center;
`

const CardsDiv = styled.div`
    max-height: 70vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`
