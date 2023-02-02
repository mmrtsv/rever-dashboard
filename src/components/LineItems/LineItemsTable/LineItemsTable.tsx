import React, { useState } from 'react'
import styled from 'styled-components'
import { LineItem, TitlesGridLI } from '@/components/LineItems'
import Pagination from '@/components/PaginationComponent/Pagination'
import useSearchLineItems from '@/hooks/useSearchLineItems'
import useSearchPendingLineItems from '@/hooks/useSearchPendingLineItems'
import useSearchCompletedLineItems from '@/hooks/useSearchCompletedLineItems'

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

    const { pendingLineItems, totalPending } = useSearchPendingLineItems(
        actualPage,
        Limit,
        freeText
    )

    const { completedLineItems, totalCompleted } = useSearchCompletedLineItems(
        actualPage,
        Limit,
        freeText
    )

    const { LineItems, totalLineItems } = useSearchLineItems(
        actualPage,
        Limit,
        freeText
    )
    const MaxPage = totalLineItems && Math.ceil(totalLineItems / Limit)
    const MaxPendingPage = totalPending && Math.ceil(totalPending / Limit)
    const MaxCompletedPage = totalCompleted && Math.ceil(totalCompleted / Limit)

    return (
        <TableDiv data-testid="LineItemsTable">
            <TitlesGridLI />
            {currentTab === 0 ? (
                <>
                    {LineItems &&
                        LineItems.map((lineItem, i) => {
                            return (
                                <LineItem
                                    lineItem={lineItem}
                                    key={lineItem.rever_id}
                                    first={i === 0}
                                    last={i === LineItems.length - 1}
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
                    {pendingLineItems &&
                        pendingLineItems.map((lineItem, i) => {
                            return (
                                <LineItem
                                    lineItem={lineItem}
                                    key={lineItem.rever_id}
                                    first={i === 0}
                                    last={i === pendingLineItems.length - 1}
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
                    {completedLineItems &&
                        completedLineItems.map((lineItem, i) => {
                            return (
                                <LineItem
                                    lineItem={lineItem}
                                    key={lineItem.rever_id}
                                    first={i === 0}
                                    last={i === completedLineItems.length - 1}
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
