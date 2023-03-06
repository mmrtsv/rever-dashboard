import React, { useState } from 'react'
import styled from 'styled-components'
import { LineItem, TitlesGridLI } from '@/components/LineItems'
import Pagination from '@/components/PaginationComponent/Pagination'
import useSearchLineItems from '@/hooks/useSearchLineItems'
import useSearchPendingLineItems from '@/hooks/useSearchPendingLineItems'
import useSearchCompletedLineItems from '@/hooks/useSearchCompletedLineItems'
import { useAppSelector } from '@/redux/hooks'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'

interface TableProps {
    currentTab: number
    freeText: string
    actualPage: number
    setActualPage: (page: number) => void
}

const LineItemsTable: React.FC<TableProps> = ({
    currentTab,
    freeText,
    actualPage,
    setActualPage
}) => {
    const [Limit, setLimit] = useState<number>(10)

    // All line items
    const LineItemsCall = useAppSelector(
        (store) => store.lineItemsApi.getLineItems.response
    )
    const mappedLineItems = LineItemsCall.line_items?.flatMap((litem) => {
        const items: ModelsPublicReturnLineItem[] = []
        if (litem.quantity) {
            for (let i = 0; i < litem.quantity; i++) {
                items.push(litem)
            }
        }
        return items
    })
    const totalLineItems = LineItemsCall.rowcount
    const MaxPage = totalLineItems && Math.ceil(totalLineItems / Limit)
    useSearchLineItems(actualPage, Limit, freeText)

    // Pending line items
    const PendingLineItemsCall = useAppSelector(
        (store) => store.lineItemsApi.getPendingLineItems.response
    )
    const mappedPendingLineItems = PendingLineItemsCall.line_items?.flatMap(
        (litem) => {
            const items: ModelsPublicReturnLineItem[] = []
            if (litem.quantity) {
                for (let i = 0; i < litem.quantity; i++) {
                    items.push(litem)
                }
            }
            return items
        }
    )
    const totalPending = PendingLineItemsCall.rowcount
    const MaxPendingPage = totalPending && Math.ceil(totalPending / Limit)
    useSearchPendingLineItems(actualPage, Limit, freeText)

    // Completed line items
    const CompletedLineItemsCall = useAppSelector(
        (store) => store.lineItemsApi.getCompletedLineItems.response
    )
    const mappedCompletedLineItems = CompletedLineItemsCall.line_items?.flatMap(
        (litem) => {
            const items: ModelsPublicReturnLineItem[] = []
            if (litem.quantity) {
                for (let i = 0; i < litem.quantity; i++) {
                    items.push(litem)
                }
            }
            return items
        }
    )
    const totalCompleted = CompletedLineItemsCall.rowcount
    const MaxCompletedPage = totalCompleted && Math.ceil(totalCompleted / Limit)
    useSearchCompletedLineItems(actualPage, Limit, freeText)

    return (
        <TableDiv data-testid="LineItemsTable">
            <TitlesGridLI />
            {currentTab === 0 ? (
                <>
                    {mappedLineItems &&
                        mappedLineItems.map((lineItem, i) => {
                            return (
                                <LineItem
                                    lineItem={lineItem}
                                    key={i}
                                    first={i === 0}
                                    last={i === mappedLineItems.length - 1}
                                />
                            )
                        })}
                    <Pagination
                        actualPage={actualPage}
                        setActualPage={setActualPage}
                        limit={Limit}
                        setLimit={setLimit}
                        maxPage={MaxPage ?? 0}
                    />
                </>
            ) : currentTab === 1 ? (
                <>
                    {mappedPendingLineItems &&
                        mappedPendingLineItems.map((lineItem, i) => {
                            return (
                                <LineItem
                                    lineItem={lineItem}
                                    key={i}
                                    first={i === 0}
                                    last={
                                        i === mappedPendingLineItems.length - 1
                                    }
                                />
                            )
                        })}
                    <Pagination
                        actualPage={actualPage}
                        setActualPage={setActualPage}
                        limit={Limit}
                        setLimit={setLimit}
                        maxPage={MaxPendingPage ?? 0}
                    />
                </>
            ) : (
                <>
                    {mappedCompletedLineItems &&
                        mappedCompletedLineItems.map((lineItem, i) => {
                            return (
                                <LineItem
                                    lineItem={lineItem}
                                    key={i}
                                    first={i === 0}
                                    last={
                                        i ===
                                        mappedCompletedLineItems.length - 1
                                    }
                                />
                            )
                        })}
                    <Pagination
                        actualPage={actualPage}
                        setActualPage={setActualPage}
                        limit={Limit}
                        setLimit={setLimit}
                        maxPage={MaxCompletedPage ?? 0}
                    />
                </>
            )}
        </TableDiv>
    )
}

export default LineItemsTable

const TableDiv = styled.div`
    margin: 0rem 2rem 2rem 2rem;
    border-radius: 0.5rem;
    border: 1px solid #eee;
`
