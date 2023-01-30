import { useState, useEffect } from 'react'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'
import { getProcesses, resetProcessesApiCalls } from '../redux/api/processesApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchOrders(
    pageNum: number,
    limit: number,
    freeText: string,
    selectedEcommerce?: string
) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.tokenData.token)

    const processesApiGetProcesses = useAppSelector(
        (store) => store.processesApi.getProcesses
    )
    const [Orders, setOrders] = useState<
        ModelsPublicReturnProcess[] | undefined
    >([])

    const totalOrders = processesApiGetProcesses.response.rowcount

    useEffect(() => {
        if (token)
            if (freeText.length > 2) {
                dispatch(
                    getProcesses({
                        freetext: freeText,
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            } else if (freeText.length === 0) {
                dispatch(
                    getProcesses({
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            }
    }, [pageNum, limit, freeText, selectedEcommerce, token])

    useEffect(() => {
        if (processesApiGetProcesses.loading === 'succeeded') {
            setOrders(processesApiGetProcesses.response.processes)
            dispatch(resetProcessesApiCalls())
        } else if (processesApiGetProcesses.loading === 'failed') {
            dispatch(resetProcessesApiCalls())
        }
    }, [processesApiGetProcesses.response, processesApiGetProcesses.loading])

    return { Orders, totalOrders }
}

export default useSearchOrders
