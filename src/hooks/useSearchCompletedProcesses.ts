import { useState, useEffect } from 'react'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import {
    getCompletedProcesses,
    resetProcessesApiCalls
} from '../redux/api/processesApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchCompletedOrders(
    pageNum: number,
    limit: number,
    freeText: string
) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.tokenData.token)

    const processesApiGetProcesses = useAppSelector(
        (store) => store.processesApi.getCompletedProcesses
    )
    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )
    const [CompletedOrders, setCompletedOrders] = useState<
        ModelsPublicReturnProcess[] | undefined
    >([])

    const totalCompletedOrders = processesApiGetProcesses.response.rowcount

    useEffect(() => {
        if (token)
            if (freeText.length > 2) {
                dispatch(
                    getCompletedProcesses({
                        freetext: freeText,
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            } else if (freeText.length === 0) {
                dispatch(
                    getCompletedProcesses({
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            }
    }, [pageNum, limit, freeText, selectedEcommerce, token])

    useEffect(() => {
        if (processesApiGetProcesses.loading === 'succeeded') {
            setCompletedOrders(processesApiGetProcesses.response.processes)
            dispatch(resetProcessesApiCalls())
        } else if (processesApiGetProcesses.loading === 'failed') {
            dispatch(resetProcessesApiCalls())
        }
    }, [processesApiGetProcesses.response, processesApiGetProcesses.loading])

    return { CompletedOrders, totalCompletedOrders }
}

export default useSearchCompletedOrders
