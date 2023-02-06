import { useEffect, useState } from 'react'
import { getReport, resetReportsApiCalls } from '../redux/api/reportsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { ReportsReportResponse } from '@itsrever/dashboard-api'

export function useSearchFinancialReport() {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const ecommercesList = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces
    )
    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    const reportsApiGetReport = useAppSelector(
        (store) => store.reportsApi.getReport
    )

    const ecommerceId = selectedEcommerce
        ? selectedEcommerce
        : ecommercesList
        ? ecommercesList[0]
        : ''

    const [report, setReport] = useState<ReportsReportResponse | undefined>()

    useEffect(() => {
        if (token && ecommerceId)
            dispatch(
                getReport({
                    ecommerceId,
                    month: '12',
                    year: 2022
                })
            )
    }, [ecommerceId, token])

    useEffect(() => {
        if (reportsApiGetReport.loading === 'succeeded') {
            setReport(reportsApiGetReport.response)
            dispatch(resetReportsApiCalls())
        } else if (reportsApiGetReport.loading === 'failed') {
            dispatch(resetReportsApiCalls())
        }
    }, [reportsApiGetReport.response, reportsApiGetReport.loading])

    return { report }
}

export default useSearchFinancialReport
