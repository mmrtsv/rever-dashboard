import React from 'react'
import Pagination from '@/components/PaginationComponent/Pagination'
import Process from '../Process/Process'
import { useAppSelector } from '@/redux/hooks'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'

interface TableProps {
    actualPage: number
    setActualPage: (page: number) => void
    processes?: ModelsPublicReturnProcess[]
    totalProcesses?: number
}

const ProcessesTable: React.FC<TableProps> = ({
    actualPage,
    setActualPage,
    processes,
    totalProcesses
}) => {
    const Limit = useAppSelector((store) => store.generalData.limitPagination)
    const MaxPage = totalProcesses && Math.ceil(totalProcesses / Limit)

    return (
        <>
            {processes &&
                processes.map((order, i) => {
                    return (
                        <Process
                            Process={order}
                            key={i}
                            first={i === 0}
                            last={i === processes.length - 1}
                        />
                    )
                })}
            <Pagination
                actualPage={actualPage}
                setActualPage={setActualPage}
                maxPage={MaxPage ?? 0}
            />
        </>
    )
}

export default ProcessesTable
