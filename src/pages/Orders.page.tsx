import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import styled from 'styled-components'
import OrdersTable from '../components/Orders/OrdersTable'
import { getProcesses } from '../redux/api/processesApi'
import { FindPaginatedResults } from '@itsrever/dashboard-api'
import { ModelsReturnProcess } from '@itsrever/dashboard-api'
const Orders = () => {
    return (
        <ReverOrdersMain>
            <Width>
                <OrdersTable />
            </Width>
        </ReverOrdersMain>
    )
}
const Width = styled.div`
    width: 70%;
    margin-top: 4%;
`
const ReverOrdersMain = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    /* background-color: #d2d1d1; */
`

export default Orders
