import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
    FindPaginatedResults,
    ModelsReturnProcess
} from '@itsrever/dashboard-api'
import {
    getProcesses,
    resetProcessesApiCalls
} from '../../../redux/api/processesApi'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Return ID', width: 120 },
    {
        field: 'name',
        headerName: 'Name',
        width: 200
        // editable: true
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 400
    },
    {
        field: 'status',
        headerName: 'Status',

        width: 110
    }
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`
    // }
]

// const rows = [
//     {
//         id: 1,
//         name: 'Jon Snow',
//         address: ' jejejejejejeje',
//         status: 'completed'
//     },
//     {
//         customer_order_id: 2,
//         customer: {
//             name: 'Jon',
//             surname: 'Snow'
//         },
//         address: {

//         }
//     }
// ]
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
    const [Processes, setProcesses] = React.useState<
        ModelsReturnProcess[] | undefined
    >([])
    const [PaginationResponse, setPaginationResponse] = React.useState<
        number | undefined
    >(0)
    const [Rows, setRows] = React.useState<any>([
        {
            id: '',
            name: '',
            address: '',
            status: ''
        }
    ])
    const dispatch = useAppDispatch()
    const processesApi = useAppSelector((store) => store.processesApi)
    React.useEffect(() => {
        dispatch(getProcesses())
    }, [])
    React.useEffect(() => {
        if (processesApi.getProcesses.loading === 'succeeded') {
            setProcesses(processesApi.getProcesses.response.processes)
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
    React.useEffect(() => {
        if (Processes) {
            mapProcessesToRows()
        }
    }, [Processes])

    return (
        <Box sx={{ height: 650, width: '100%' }}>
            <DataGrid
                rows={Rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                pagination={true}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    )
}

export default OrdersTable
