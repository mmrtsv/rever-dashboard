import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import ShippingStatus from '../ShippingStatus/ShippingStatus'
interface OrderListItemProps {
    row: {
        id: string
        name: string
        product: string
        status: string
    }
    key: number
}

const OrderListItem: React.FC<OrderListItemProps> = ({ row, key }) => {
    return (
        <TableRow
            key={key}
            className=" cursor-pointer"
            sx={
                {
                    // '&.MuiTableRow-root:hover': {
                    //     backgroundColor: 'red'
                    // }
                    // height: '50px'
                }
            }
            hover
            role="checkbox"
        >
            <TableCell className="p-4 md:p-16" component="th" scope="row">
                {row.id}
            </TableCell>
            <TableCell className="p-4 md:p-16" component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell className="p-4 md:p-16" component="th" scope="row">
                {row.product}
            </TableCell>
            <TableCell className="p-4 md:p-16" component="th" scope="row">
                <ShippingStatus enum={row.status} />
            </TableCell>
        </TableRow>
    )
}

export default OrderListItem
