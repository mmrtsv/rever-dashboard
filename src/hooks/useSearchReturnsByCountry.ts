import { useEffect, useState } from 'react'
import {
    getReturnsByCountry,
    resetReportsApiCalls
} from '../redux/api/reportsApi'
import { ProcessessapiDbReturnsByCountry } from '@itsrever/dashboard-api'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchReturnsByCountry(from: string, to: string) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const ecommercesList = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces
    )
    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    const reportsApiGetReturnsByCountry = useAppSelector(
        (store) => store.reportsApi.getReturnsByCountry
    )
    const [returnsByCountry, setReturnsByCountry] = useState<
        Array<ProcessessapiDbReturnsByCountry> | undefined
    >()

    const ecommerceId = selectedEcommerce
        ? selectedEcommerce
        : ecommercesList
        ? ecommercesList[0]
        : ''

    useEffect(() => {
        if (token && ecommerceId && from && to)
            dispatch(
                getReturnsByCountry({
                    ecommerceId: ecommerceId,
                    from: from,
                    to: to
                })
            )
    }, [to, from, ecommerceId, token, dispatch])

    useEffect(() => {
        if (reportsApiGetReturnsByCountry.loading === 'succeeded') {
            setReturnsByCountry(reportsApiGetReturnsByCountry.response)
            dispatch(resetReportsApiCalls())
        } else if (reportsApiGetReturnsByCountry.loading === 'failed') {
            dispatch(resetReportsApiCalls())
        }
    }, [
        reportsApiGetReturnsByCountry.response,
        reportsApiGetReturnsByCountry.loading
    ])
    return { returnsByCountry }
}

export default useSearchReturnsByCountry
