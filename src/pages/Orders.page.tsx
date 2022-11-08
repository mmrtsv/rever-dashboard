import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import OrdersTable from '../components/Orders/OrdersTable'
import PageComponent from '../components/PageComponent'

const Orders = () => {
    return (
        <PageComponent>
            <OrdersTable />
        </PageComponent>
    )
}

export default Orders
