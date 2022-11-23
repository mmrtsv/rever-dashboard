import React from 'react'

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
        <tr key={key}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.address}</td>
            <td>{row.status}</td>
        </tr>
    )
}

export default OrderListItem
