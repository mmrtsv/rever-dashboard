import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

interface OrderListItemProps {
    row: {
        id: string
        name: string
        address: string
        status: string
    }
    key: number
}

const OrderListItem: React.FC<OrderListItemProps> = ({ row, key }) => {
    return (
        <TableRow key={key} className="cursor-pointer" hover role="checkbox">
            <TableCell className="p-4 md:p-16" component="th" scope="row">
                {row.id}
            </TableCell>
            <TableCell className="p-4 md:p-16" component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell className="p-4 md:p-16" component="th" scope="row">
                {row.address}
            </TableCell>
            <TableCell className="p-4 md:p-16" component="th" scope="row">
                {row.status}
            </TableCell>
        </TableRow>
    )
}

export default OrderListItem
