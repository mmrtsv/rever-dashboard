import React, { useState } from 'react'
import styled from 'styled-components'
import useSearchProcesses from '@/hooks/useSearchProcesses'
import useSearchCompletedProcesses from '@/hooks/useSearchCompletedProcesses'
import useSearchPendingProcesses from '@/hooks/useSearchPendingProcesses'
import Process from '../Process/Process'
import Pagination from '@/components/PaginationComponent/Pagination'
import TitlesP from './TitlesP/TitlesP'

interface TableProps {
    currentTab: number
    freeText: string
    actualPage: number
    setActualPage: (page: number) => void
}

const ProcessesTable: React.FC<TableProps> = ({ currentTab, freeText }) => {
    const [ActualPage, setActualPage] = useState<number>(0)
    const [Limit, setLimit] = useState<number>(10)

    const { Orders, totalOrders } = useSearchProcesses(
        ActualPage,
        Limit,
        freeText
    )
    const { PendingOrders, totalPendingOrders } = useSearchPendingProcesses(
        ActualPage,
        Limit,
        freeText
    )
    const { CompletedOrders, totalCompletedOrders } =
        useSearchCompletedProcesses(ActualPage, Limit, freeText)

    const MaxPage = totalOrders && Math.ceil(totalOrders / Limit)
    const MaxPagePending =
        totalPendingOrders && Math.ceil(totalPendingOrders / Limit)
    const MaxPageCompleted =
        totalCompletedOrders && Math.ceil(totalCompletedOrders / Limit)

    return (
        <TableDiv data-testid="ProcessesTable">
            <TitlesP />
            {currentTab === 0 ? (
                <>
                    {Orders &&
                        Orders.map((order, i) => {
                            return (
                                <Process
                                    Process={order}
                                    key={order.process_id}
                                    first={i === 0}
                                    last={i === Orders.length - 1}
                                />
                            )
                        })}
                    <Pagination
                        actualPage={ActualPage}
                        setActualPage={setActualPage}
                        limit={Limit}
                        setLimit={setLimit}
                        maxPage={MaxPage ?? 0}
                    />
                </>
            ) : currentTab === 1 ? (
                <>
                    {PendingOrders &&
                        PendingOrders.map((order, i) => {
                            return (
                                <Process
                                    Process={order}
                                    key={order.process_id}
                                    first={i === 0}
                                    last={i === PendingOrders.length - 1}
                                />
                            )
                        })}
                    <Pagination
                        actualPage={ActualPage}
                        setActualPage={setActualPage}
                        limit={Limit}
                        setLimit={setLimit}
                        maxPage={MaxPagePending ?? 0}
                    />
                </>
            ) : (
                <>
                    {CompletedOrders &&
                        CompletedOrders.map((order, i) => {
                            return (
                                <Process
                                    Process={order}
                                    key={order.process_id}
                                    first={i === 0}
                                    last={i === CompletedOrders.length - 1}
                                />
                            )
                        })}
                    <Pagination
                        actualPage={ActualPage}
                        setActualPage={setActualPage}
                        limit={Limit}
                        setLimit={setLimit}
                        maxPage={MaxPageCompleted ?? 0}
                    />
                </>
            )}
        </TableDiv>
    )
}

export default ProcessesTable

const TableDiv = styled.div`
    margin: 0rem 2rem 2rem 2rem;
    border-radius: 0.5rem;
    border: 1px solid #eee;
`
