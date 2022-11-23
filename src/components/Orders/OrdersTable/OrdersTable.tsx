import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
    FindPaginatedResults,
    ModelsReturnProcess
} from '@itsrever/dashboard-api'
import {
    getProcesses,
    resetProcessesApiCalls
} from '../../../redux/api/processesApi'
import styled from 'styled-components'
import OrderListItem from '../OrderListItem'

interface RowsTypes {
    id: any
    name: any
    address: any
    status: any
}
interface Row {
    row: Array<RowsTypes>
}

const OrdersTable = () => {
    const [Processes, setProcesses] = useState<
        ModelsReturnProcess[] | undefined
    >([])
    const [PaginationResponse, setPaginationResponse] = useState<
        number | undefined
    >()
    const [Rows, setRows] = useState<any>([
        {
            id: '',
            name: '',
            address: '',
            status: ''
        }
    ])
    const dispatch = useAppDispatch()
    const processesApi = useAppSelector((store) => store.processesApi)

    useEffect(() => {
        if (processesApi.getProcesses.loading === 'succeeded') {
            setProcesses(processesApi.getProcesses.response.processes)
            setPaginationResponse(processesApi.getProcesses.response.rowcount)
            dispatch(resetProcessesApiCalls())
        } else if (processesApi.getProcesses.loading === 'failed') {
            dispatch(resetProcessesApiCalls())
        }
    }, [processesApi.getProcesses.response, processesApi.getProcesses.loading])

    // a function that maps processes to rows
    const mapProcessesToRows = () => {
        if (Processes) {
            const rows = Processes.map((process) => {
                return {
                    id: process.customer_printed_order_id,
                    name:
                        process.customer?.first_name +
                        ' ' +
                        process.customer?.last_name,
                    address: process.drop_off_address
                        ? process.drop_off_address.address_line_1 +
                          ', ' +
                          process.drop_off_address.city
                        : process.pickup_address
                        ? process.pickup_address.address_line_1 +
                          ', ' +
                          process.pickup_address.city
                        : 'N/A',
                    status:
                        process.status === 0
                            ? 'Running'
                            : process.status === 1
                            ? 'Failed'
                            : process.status === 2
                            ? 'Completed'
                            : process.status === 3
                            ? 'On Hold'
                            : 'N/A'
                }
            })
            return setRows(rows)
        }
    }
    //react state for pagination with start on 20
    const [Pagination, setPagination] = useState<number>(0)
    const [ActualPage, setActualPage] = useState<number>(1)
    useEffect(() => {
        if (Processes) {
            mapProcessesToRows()
        }
    }, [Processes])

    // function that onclick fetches api for next page
    // const fetchNextPage = () => {
    //     if (PaginationResponse) {
    //         //fetch next page
    //         dispatch(getProcesses({ offset: 20 }))
    //     }
    // }
    useEffect(() => {
        if (Pagination >= 0) {
            dispatch(getProcesses({ offset: Pagination }))
        }
    }, [Pagination])

    // function that on click fetches api for previous page
    const fetchPreviousPage = () => {
        if (ActualPage > 1) {
            setPagination(Pagination - 20)
            setActualPage(ActualPage - 1)
        }
    }
    // function that on click fetches api for next page
    const fetchNextPage = () => {
        if (
            PaginationResponse &&
            Math.ceil(PaginationResponse / 20) >= ActualPage + 1
        ) {
            setPagination(Pagination + 20)
            setActualPage(ActualPage + 1)
        }
    }

    return (
        <Main data-testid="OrdersTable">
            <ReverTable>
                <thead>
                    <tr>
                        <th>Return ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Rows.map((row: any) => {
                        return <OrderListItem row={row} key={row.id} />
                    })}
                </tbody>
            </ReverTable>
            <TableFooter>
                <button onClick={() => fetchPreviousPage()}>Previous</button>
                <a>
                    {ActualPage} of{' '}
                    {PaginationResponse && Math.ceil(PaginationResponse / 20)}
                </a>
                <button onClick={() => fetchNextPage()}>Next</button>
            </TableFooter>
        </Main>
    )
}
const TableFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 3rem;
    background-color: #f5f5f5;
    border-top: 1px solid #e0e0e0;
    position: sticky;
    bottom: 0;
`

const Main = styled.div`
    height: 70vh;
    width: 100%;
    overflow: scroll;
    padding: 0 1rem 0 1rem;
    margin-top: 1rem;
`
const ReverTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #e1e8ee;
    thead {
        background-color: #f8f8f8;
        border: 1px solid #e1e8ee;
        position: sticky;
        top: 0;
        margin: 0 0 0 0;
        tr {
            th {
                padding: 10px 15px;
                font-weight: 500;
                font-size: 14px;
                color: #172b4d;
                text-align: left;
            }
        }
    }
    tbody {
        tr {
            td {
                padding: 10px 15px;
                font-size: 14px;
                color: #172b4d;
                border-bottom: 1px solid #e1e8ee;
                &:first-child {
                    font-weight: 500;
                }
            }
        }
    }
    /* tfoot {
        position: sticky;
        bottom: -100px;
        margin: 0 0 0 0;
        tr {
            td {
                padding: 10px 15px;
                font-size: 14px;
                color: #172b4d;
                border-top: 1px solid #e1e8ee;
                text-align: center;
            }
        }
    } */
`

export default OrdersTable
