import { useEffect, useState } from 'react'
import { getReport, resetReportsApiCalls } from '../redux/api/reportsApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { ReportsReportResponse } from '@itsrever/dashboard-api'

export function useSearchFinancialReport(month: number, year: number) {
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
        if (token && ecommerceId && month && year)
            dispatch(
                getReport({
                    ecommerceId,
                    month: month,
                    year: year
                })
            )
    }, [ecommerceId, token, month, year])

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
