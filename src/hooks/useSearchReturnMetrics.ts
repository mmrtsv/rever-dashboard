import { useEffect, useState } from 'react'
import { getReturnMetrics, resetReportsApiCalls } from '../redux/api/reportsApi'
import { ReportsMainMetricsResponse } from '@itsrever/dashboard-api'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchReturnMetrics(from: string, to: string) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const ecommercesList = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces
    )
    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    const reportsApiGetReturnsMetrics = useAppSelector(
        (store) => store.reportsApi.getReturnsMetrics
    )
    const [returnMetrics, setReturnMetrics] = useState<
        ReportsMainMetricsResponse | undefined
    >()

    const ecommerceId = selectedEcommerce
        ? selectedEcommerce
        : ecommercesList
        ? ecommercesList[0]
        : ''

    useEffect(() => {
        if (token && ecommerceId && from && to)
            dispatch(
                getReturnMetrics({
                    ecommerceId: ecommerceId,
                    from: from,
                    to: to
                })
            )
    }, [to, from, ecommerceId, token, dispatch])

    useEffect(() => {
        if (reportsApiGetReturnsMetrics.loading === 'succeeded') {
            setReturnMetrics(reportsApiGetReturnsMetrics.response)
            dispatch(resetReportsApiCalls())
        } else if (reportsApiGetReturnsMetrics.loading === 'failed') {
            dispatch(resetReportsApiCalls())
        }
    }, [
        reportsApiGetReturnsMetrics.response,
        reportsApiGetReturnsMetrics.loading
    ])
    return { returnMetrics }
}

export default useSearchReturnMetrics
