import { useEffect, useState } from 'react'
import { getRefundTypes, resetReportsApiCalls } from '../redux/api/reportsApi'
import { ProcessessapiDbTotalReturnTypes } from '@itsrever/dashboard-api'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchReturnTypes(from: string, to: string) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const ecommercesList = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces
    )
    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    const reportsApiGetRefundTypes = useAppSelector(
        (store) => store.reportsApi.getRefundTypes
    )
    const [returnTypes, setReturnTypes] = useState<
        ProcessessapiDbTotalReturnTypes | undefined
    >()

    const ecommerceId = selectedEcommerce
        ? selectedEcommerce
        : ecommercesList
        ? ecommercesList[0]
        : ''

    useEffect(() => {
        if (token && ecommerceId && from && to)
            dispatch(
                getRefundTypes({
                    ecommerceId: ecommerceId,
                    from: from,
                    to: to
                })
            )
    }, [to, from, ecommerceId, token, dispatch])

    useEffect(() => {
        if (reportsApiGetRefundTypes.loading === 'succeeded') {
            setReturnTypes(reportsApiGetRefundTypes.response)
            dispatch(resetReportsApiCalls())
        } else if (reportsApiGetRefundTypes.loading === 'failed') {
            dispatch(resetReportsApiCalls())
        }
    }, [reportsApiGetRefundTypes.response, reportsApiGetRefundTypes.loading])
    return { returnTypes }
}

export default useSearchReturnTypes
