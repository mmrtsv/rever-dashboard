import { useEffect, useState } from 'react'
import {
    getReturnTypesByDay,
    resetReportsApiCalls
} from '../redux/api/reportsApi'
import { ProcessessapiDbReturnStatsByDay } from '@itsrever/dashboard-api'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchReturnTypesByDay(from: string, to: string) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const ecommercesList = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces
    )
    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    const reportsApiGetReturnTypesByDay = useAppSelector(
        (store) => store.reportsApi.getReturnTypesByDay
    )
    const [returnTypesByDay, setReturnTypesByDay] = useState<
        Array<ProcessessapiDbReturnStatsByDay> | undefined
    >()

    const ecommerceId = selectedEcommerce
        ? selectedEcommerce
        : ecommercesList
        ? ecommercesList[0]
        : ''

    useEffect(() => {
        if (token && ecommerceId && from && to)
            dispatch(
                getReturnTypesByDay({
                    ecommerceId: ecommerceId,
                    from: from,
                    to: to
                })
            )
    }, [to, from, ecommerceId, token, dispatch])

    useEffect(() => {
        if (reportsApiGetReturnTypesByDay.loading === 'succeeded') {
            setReturnTypesByDay(reportsApiGetReturnTypesByDay.response)
            dispatch(resetReportsApiCalls())
        } else if (reportsApiGetReturnTypesByDay.loading === 'failed') {
            dispatch(resetReportsApiCalls())
        }
    }, [
        reportsApiGetReturnTypesByDay.response,
        reportsApiGetReturnTypesByDay.loading
    ])
    return { returnTypesByDay }
}

export default useSearchReturnTypesByDay
