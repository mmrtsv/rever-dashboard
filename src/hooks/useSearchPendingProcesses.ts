import { useState, useEffect } from 'react'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import {
    getPendingProcesses,
    resetProcessesApiCalls
} from '../redux/api/processesApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchPendingOrders(
    pageNum: number,
    limit: number,
    freeText: string,
    selectedEcommerce?: string
) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.tokenData.token)

    const processesApiGetProcesses = useAppSelector(
        (store) => store.processesApi.getPendingProcesses
    )
    const [PendingOrders, setPendingOrders] = useState<
        ModelsPublicReturnProcess[] | undefined
    >([])

    const totalPendingOrders = processesApiGetProcesses.response.rowcount

    useEffect(() => {
        if (token)
            if (freeText.length > 2) {
                dispatch(
                    getPendingProcesses({
                        freetext: freeText,
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            } else if (freeText.length === 0) {
                dispatch(
                    getPendingProcesses({
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            }
    }, [pageNum, limit, freeText, selectedEcommerce, token])

    useEffect(() => {
        if (processesApiGetProcesses.loading === 'succeeded') {
            setPendingOrders(processesApiGetProcesses.response.processes)
            dispatch(resetProcessesApiCalls())
        } else if (processesApiGetProcesses.loading === 'failed') {
            dispatch(resetProcessesApiCalls())
        }
    }, [processesApiGetProcesses.response, processesApiGetProcesses.loading])

    return { PendingOrders, totalPendingOrders }
}

export default useSearchPendingOrders
