import React, { useState } from 'react'
import styled from 'styled-components'
import useSearchProcesses from '@/hooks/useSearchProcesses'
import useSearchCompletedProcesses from '@/hooks/useSearchCompletedProcesses'
import useSearchPendingProcesses from '@/hooks/useSearchPendingProcesses'
import useSearchActionRequiredProcesses from '@/hooks/useSearchActionRequiredProcesses'
import Process from '../Process/Process'
import Pagination from '@/components/PaginationComponent/Pagination'
import TitlesP from './TitlesP/TitlesP'
import { useAppSelector } from '@/redux/hooks'

interface TableProps {
    currentTab: number
    freeText: string
    actualPage: number
    setActualPage: (page: number) => void
}

const ProcessesTable: React.FC<TableProps> = ({ currentTab, freeText }) => {
    const [ActualPage, setActualPage] = useState<number>(0)
    const [Limit, setLimit] = useState<number>(10)

    // All processes
    const ProcessesCall = useAppSelector(
        (store) => store.processesApi.getProcesses.response
    )
    const Processes = ProcessesCall.processes
    const totalProcesses = ProcessesCall.rowcount
    const MaxPage = totalProcesses && Math.ceil(totalProcesses / Limit)
    useSearchProcesses(ActualPage, Limit, freeText)

    // Pending processes
    const PendingProcessesCall = useAppSelector(
        (store) => store.processesApi.getPendingProcesses.response
    )
    const PendingProcesses = PendingProcessesCall.processes
    const totalPendingProcesses = PendingProcessesCall.rowcount
    const MaxPagePending =
        totalPendingProcesses && Math.ceil(totalPendingProcesses / Limit)
    useSearchPendingProcesses(ActualPage, Limit, freeText)

    // Action Required processes
    const ActionRequiredProcessesCall = useAppSelector(
        (store) => store.processesApi.getActionRequiredProcesses.response
    )
    const ActionRequiredProcesses = ActionRequiredProcessesCall.processes
    const totalActionRequiredProcesses = ActionRequiredProcessesCall.rowcount
    const MaxPageActionRequired =
        totalActionRequiredProcesses &&
        Math.ceil(totalActionRequiredProcesses / Limit)
    useSearchActionRequiredProcesses(ActualPage, Limit, freeText)

    // Completed processes
    const CompletedProcessesCall = useAppSelector(
        (store) => store.processesApi.getCompletedProcesses.response
    )
    const CompletedProcesses = CompletedProcessesCall.processes
    const totalCompletedProcesses = CompletedProcessesCall.rowcount
    const MaxPageCompleted =
        totalCompletedProcesses && Math.ceil(totalCompletedProcesses / Limit)
    useSearchCompletedProcesses(ActualPage, Limit, freeText)

    return (
        <TableDiv data-testid="ProcessesTable">
            <TitlesP />
            {currentTab === 0 ? (
                <>
                    {Processes &&
                        Processes.map((order, i) => {
                            return (
                                <Process
                                    Process={order}
                                    key={order.process_id}
                                    first={i === 0}
                                    last={i === Processes.length - 1}
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
                    {PendingProcesses &&
                        PendingProcesses.map((order, i) => {
                            return (
                                <Process
                                    Process={order}
                                    key={order.process_id}
                                    first={i === 0}
                                    last={i === PendingProcesses.length - 1}
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
            ) : currentTab === 2 ? (
                <>
                    {ActionRequiredProcesses &&
                        ActionRequiredProcesses.map((order, i) => {
                            return (
                                <Process
                                    Process={order}
                                    key={order.process_id}
                                    first={i === 0}
                                    last={
                                        i === ActionRequiredProcesses.length - 1
                                    }
                                />
                            )
                        })}
                    <Pagination
                        actualPage={ActualPage}
                        setActualPage={setActualPage}
                        limit={Limit}
                        setLimit={setLimit}
                        maxPage={MaxPageActionRequired ?? 0}
                    />
                </>
            ) : (
                <>
                    {CompletedProcesses &&
                        CompletedProcesses.map((order, i) => {
                            return (
                                <Process
                                    Process={order}
                                    key={order.process_id}
                                    first={i === 0}
                                    last={i === CompletedProcesses.length - 1}
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
