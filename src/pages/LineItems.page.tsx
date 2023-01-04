import React from 'react'
import OrdersTable from '../components/Orders/OrdersTable'
import PageComponent from '../components/PageComponent'
import { useEffect, useState } from 'react'
import LoadingModal from '../components/Loading/LoadingModal'
import { useAppSelector } from '../redux/hooks'

function Orders() {
    const token = useAppSelector((state) => state.tokenData.token)
    const [Loading, setLoading] = useState(true)
    useEffect(() => {
        // token != null ? setLoading(false) : setLoading(true)
        if (token != null) {
            // location.reload()
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [token])

    return (
        <PageComponent>
            {Loading ? <LoadingModal loading={Loading} /> : <OrdersTable />}
        </PageComponent>
    )
}

export default Orders
