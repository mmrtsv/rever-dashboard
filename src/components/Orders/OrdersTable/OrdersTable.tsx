import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
    FindPaginatedResults,
    ModelsReturnProcess,
    ModelsPublicReturnLineItem
} from '@itsrever/dashboard-api'
import {
    getProcesses,
    getLineItems,
    resetProcessesApiCalls
} from '../../../redux/api/processesApi'
import styled from 'styled-components'
import OrderListItem from '../OrderListItem'
import TableCell from '@mui/material/TableCell'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import { Box } from '@mui/system'

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
    //      DEPRECATED      TODO: REMOVE
    // const [Processes, setProcesses] = useState<
    //     ModelsReturnProcess[] | undefined
    // >([])

    const [LineItems, setLineItems] = useState<
        ModelsPublicReturnLineItem[] | undefined
    >([])
    const [PaginationResponse, setPaginationResponse] = useState<
        number | undefined
    >()
    const [Rows, setRows] = useState<any>([
        {
            id: '',
            name: '',
            product: '',
            status: ''
        }
    ])
    const dispatch = useAppDispatch()
    const processesApi = useAppSelector((store) => store.processesApi)
    useEffect(() => {
        if (processesApi.getLineItems.loading === 'succeeded') {
            setLineItems(processesApi.getLineItems.response.line_items)
            setPaginationResponse(processesApi.getLineItems.response.rowcount)
            dispatch(resetProcessesApiCalls())
        } else if (processesApi.getLineItems.loading === 'failed') {
            dispatch(resetProcessesApiCalls())
        }
    }, [processesApi.getLineItems.response, processesApi.getLineItems.loading])

    //      DEPRECATED      TODO: REMOVE
    // useEffect(() => {
    //     if (processesApi.getProcesses.loading === 'succeeded') {
    //         setProcesses(processesApi.getProcesses.response.processes)
    //         setPaginationResponse(processesApi.getProcesses.response.rowcount)
    //         dispatch(resetProcessesApiCalls())
    //     } else if (processesApi.getProcesses.loading === 'failed') {
    //         dispatch(resetProcessesApiCalls())
    //     }
    // }, [processesApi.getProcesses.response, processesApi.getProcesses.loading])
    // useEffect(() => {
    //     if (Pagination >= 0) {
    //         dispatch(getProcesses({ offset: Pagination }))
    //     }
    // }, [Pagination])

    // a function that maps processes to rows
    const mapProcessesToRows = () => {
        if (LineItems) {
            const rows = LineItems.map((lineItem) => {
                return {
                    rever_id: lineItem.rever_id,
                    id: lineItem?.return_process?.customer_printed_order_id,
                    name:
                        lineItem?.return_process?.customer?.first_name +
                        ' ' +
                        lineItem?.return_process?.customer?.last_name,
                    product: lineItem?.name,
                    status: lineItem?.return_process?.last_known_shipping_status
                }
            })
            console.log(rows)
            return setRows(rows)
        }
    }
    //react state for pagination with start on 20
    const [Pagination, setPagination] = useState<number>(0)
    const [ActualPage, setActualPage] = useState<number>(0)
    useEffect(() => {
        console.log(LineItems)
        if (LineItems) {
            mapProcessesToRows()
        }
    }, [LineItems])

    useEffect(() => {
        if (Pagination >= 0) {
            dispatch(getLineItems({ offset: Pagination, limit: 20 }))
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
    const [page, setPage] = React.useState(0)
    const handleChangePage = (event: unknown, newPage: number) => {
        if (
            PaginationResponse &&
            Math.ceil(PaginationResponse / 20) >= ActualPage + 1
        ) {
            setPagination(Pagination + 20)
            setActualPage(ActualPage + 1)
        }
    }
    return (
        <Main
            data-testid="OrdersTable"
            className="flex min-h-full w-full grow flex-col overflow-x-auto"
        >
            <ReverTablev2 stickyHeader className="min-w-xl">
                <ReverTableHeader>
                    <TableRow>
                        <TableCell
                            className="p-4 md:p-16"
                            component="th"
                            scope="row"
                        >
                            Order ID
                        </TableCell>
                        <TableCell
                            className="p-4 md:p-16"
                            component="th"
                            scope="row"
                        >
                            Customer name
                        </TableCell>
                        <TableCell
                            className="p-4 md:p-16"
                            component="th"
                            scope="row"
                        >
                            Product
                        </TableCell>
                        <TableCell
                            className="p-4 md:p-16"
                            component="th"
                            scope="row"
                        >
                            Status
                        </TableCell>
                    </TableRow>
                </ReverTableHeader>
                {Rows.length > 0 && (
                    <TableBody>
                        {Rows.map((row: any) => {
                            return (
                                <OrderListItem row={row} key={row.rever_id} />
                            )
                        })}
                    </TableBody>
                )}
                {/* <TableFooter> */}

                {/* </TableFooter> */}
            </ReverTablev2>
            {/* <TablePagination
                component="div"
                count={PaginationResponse}
                rowsPerPage={20}
                page={ActualPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={false}
            /> */}
            <ReverFooterTable>
                <button onClick={() => fetchPreviousPage()}>Previous</button>
                <a>
                    {ActualPage} of{' '}
                    {PaginationResponse && Math.ceil(PaginationResponse / 20)}
                </a>
                <button onClick={() => fetchNextPage()}>Next</button>
            </ReverFooterTable>
            {/* <TableFooter>
                <button onClick={() => fetchPreviousPage()}>Previous</button>
                <a>
                    {ActualPage} of{' '}
                    {PaginationResponse && Math.ceil(PaginationResponse / 20)}
                </a>
                <button onClick={() => fetchNextPage()}>Next</button>
            </TableFooter> */}
        </Main>
    )
}

const ReverTableHeader = styled(TableHead)`
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
`
const ReverTablev2 = styled(Table)`
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`
const ReverFooterTable = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 3rem;
    background-color: #f5f5f5;
    border-top: 1px solid #e0e0e0;

    width: 100%;
`

const Main = styled.div`
    width: 100%;
    max-height: 50vh;
    /* overflow: scroll; */
    overflow-y: scroll;
    display: inline-block;
    padding: 0 1rem 0 1rem;
    margin-top: 1rem;
    padding-bottom: 10rem;
`
// const ReverTable = styled.table`
//     width: 100%;
//     border-collapse: collapse;
//     border-spacing: 0;
//     border: 1px solid #e1e8ee;
//     thead {
//         background-color: #f8f8f8;
//         border: 1px solid #e1e8ee;
//         position: sticky;
//         top: 0;
//         margin: 0 0 0 0;
//         tr {
//             th {
//                 padding: 10px 15px;
//                 font-weight: 500;
//                 font-size: 14px;
//                 color: #172b4d;
//                 text-align: left;
//             }
//         }
//     }
//     tbody {
//         tr {
//             td {
//                 padding: 10px 15px;
//                 font-size: 14px;
//                 color: #172b4d;
//                 border-bottom: 1px solid #e1e8ee;
//                 &:first-child {
//                     font-weight: 500;
//                 }
//             }
//         }
//     }
//     /* tfoot {
//         position: sticky;
//         bottom: -100px;
//         margin: 0 0 0 0;
//         tr {
//             td {
//                 padding: 10px 15px;
//                 font-size: 14px;
//                 color: #172b4d;
//                 border-top: 1px solid #e1e8ee;
//                 text-align: center;
//             }
//         }
//     } */
// `

export default OrdersTable
