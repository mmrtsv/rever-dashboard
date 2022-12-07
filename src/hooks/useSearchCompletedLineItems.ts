import { useState, useEffect } from 'react'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import {
    getCompletedLineItems,
    resetProcessesApiCalls
} from '../redux/api/processesApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchCompletedLineItems(pageNum: number) {
    const dispatch = useAppDispatch()

    const processesApiCompletedLineItems = useAppSelector(
        (store) => store.processesApi.getCompletedLineItems
    )
    const [completedLineItems, setCompletedLineItems] = useState<
        ModelsPublicReturnLineItem[] | undefined
    >([])

    const totalCompleted = processesApiCompletedLineItems.response.rowcount

    useEffect(() => {
        dispatch(
            getCompletedLineItems({
                offset: pageNum * 10,
                limit: 10
            })
        )
    }, [pageNum])

    useEffect(() => {
        if (processesApiCompletedLineItems.loading === 'succeeded') {
            if (
                completedLineItems &&
                processesApiCompletedLineItems.response.line_items
            ) {
                setCompletedLineItems(
                    completedLineItems.concat(
                        processesApiCompletedLineItems.response.line_items
                    )
                )
            } else
                setCompletedLineItems(
                    processesApiCompletedLineItems.response.line_items
                )
            dispatch(resetProcessesApiCalls())
        } else if (processesApiCompletedLineItems.loading === 'failed') {
            dispatch(resetProcessesApiCalls())
        }
    }, [
        processesApiCompletedLineItems.response,
        processesApiCompletedLineItems.loading
    ])

    return { completedLineItems, totalCompleted }
}

export default useSearchCompletedLineItems
