import React, { useEffect } from 'react'
import PageComponent from '@/components/PageComponent'
import { useState } from 'react'
import styled from 'styled-components'
import FilterComponent from '../components/SearchComponent'
import TopBar from '../components/Processes/TopBarP/TopBarProcesses'
import ProcessesTable from '@/components/Processes/ProcessesTable/ProcessesTable'
import { useAppSelector } from '@/redux/hooks'
import TitlesP from '@/components/Processes/ProcessesTable/TitlesP/TitlesP'
import {
    useSearchProcesses,
    useSearchPendingProcesses,
    useSearchReviewRequiredProcesses,
    useSearchCompletedProcesses
} from '@/hooks'

function Orders() {
    const Limit = useAppSelector((store) => store.generalData.limitPagination)

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )
    useEffect(() => {
        resetPages()
    }, [selectedEcommerce])
    const handleChangeFreeText = (freeText: string) => {
        if (freeText.length === 0 || freeText.length > 2) {
            resetPages()
        }
        setFreeText(freeText)
    }

    function resetPages() {
        setActualPage(0)
        setActualPagePending(0)
        setActualPageReview(0)
        setActualPageCompl(0)
    }

    const [currentTab, setCurrentTab] = useState(0)
    const [FreeText, setFreeText] = useState<string>('')

    // All Processes
    const [actualPage, setActualPage] = useState<number>(0)
    const ProcessesCall = useAppSelector(
        (store) => store.processesApi.getProcesses.response
    )
    useSearchProcesses(actualPage, Limit, FreeText)

    // Pending Processes
    const [actualPagePending, setActualPagePending] = useState<number>(0)
    const PendingProcessesCall = useAppSelector(
        (store) => store.processesApi.getPendingProcesses.response
    )
    useSearchPendingProcesses(actualPagePending, Limit, FreeText)

    // Review Required Processes
    const [actualPageReview, setActualPageReview] = useState<number>(0)
    const ReviewProcessesCall = useAppSelector(
        (store) => store.processesApi.getReviewRequiredProcesses.response
    )
    useSearchReviewRequiredProcesses(actualPageReview, Limit, FreeText)

    // Completed Processes
    const [actualPageCompl, setActualPageCompl] = useState<number>(0)
    const ComplProcessesCall = useAppSelector(
        (store) => store.processesApi.getCompletedProcesses.response
    )
    useSearchCompletedProcesses(actualPageCompl, Limit, FreeText)

    return (
        <PageComponent>
            <div className="flex h-full flex-col">
                <TopBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <Main className="overflow-x-auto">
                    <div className="w-fit pt-4">
                        <FilterComponent
                            freeText={FreeText}
                            setFreeText={handleChangeFreeText}
                            rowCount={ProcessesCall.rowcount}
                        />
                    </div>
                    <div data-testid="ProcessesTable">
                        <TitlesP />
                        {currentTab === 0 ? (
                            <ProcessesTable
                                actualPage={actualPage}
                                setActualPage={setActualPage}
                                processes={ProcessesCall.processes}
                                totalProcesses={ProcessesCall.rowcount}
                            />
                        ) : currentTab === 1 ? (
                            <ProcessesTable
                                actualPage={actualPagePending}
                                setActualPage={setActualPagePending}
                                processes={PendingProcessesCall.processes}
                                totalProcesses={PendingProcessesCall.rowcount}
                            />
                        ) : currentTab === 2 ? (
                            <ProcessesTable
                                actualPage={actualPageReview}
                                setActualPage={setActualPageReview}
                                processes={ReviewProcessesCall.processes}
                                totalProcesses={ReviewProcessesCall.rowcount}
                            />
                        ) : currentTab === 3 ? (
                            <ProcessesTable
                                actualPage={actualPageCompl}
                                setActualPage={setActualPageCompl}
                                processes={ComplProcessesCall.processes}
                                totalProcesses={ComplProcessesCall.rowcount}
                            />
                        ) : null}
                    </div>
                </Main>
            </div>
        </PageComponent>
    )
}

export default Orders

const Main = styled.div`
    padding: 0rem 2rem 1rem 2rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    width: 100%;
`
