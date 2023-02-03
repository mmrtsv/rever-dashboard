import { useEffect, useState } from 'react'
import { getReturnTypes, resetReportsApiCalls } from '../redux/api/reportsApi'
import { ProcessessapiDbTotalReturnTypes } from '@itsrever/dashboard-api'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchReturnTypes(from: string, to: string) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.tokenData.token)

    const ecommercesList = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces
    )
    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    const reportsApiGetReturnTypes = useAppSelector(
        (store) => store.reportsApi.getReturnTypes
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
                getReturnTypes({
                    ecommerceId: ecommerceId,
                    from: from,
                    to: to
                })
            )
    }, [to, from, ecommerceId, token, dispatch])

    useEffect(() => {
        if (reportsApiGetReturnTypes.loading === 'succeeded') {
            setReturnTypes(reportsApiGetReturnTypes.response)
            dispatch(resetReportsApiCalls())
        } else if (reportsApiGetReturnTypes.loading === 'failed') {
            dispatch(resetReportsApiCalls())
        }
    }, [reportsApiGetReturnTypes.response, reportsApiGetReturnTypes.loading])
    return { returnTypes }
}

export default useSearchReturnTypes
