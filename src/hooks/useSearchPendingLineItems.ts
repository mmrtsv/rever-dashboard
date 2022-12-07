import { useState, useEffect } from 'react'
import { ModelsPublicReturnLineItem } from '@itsrever/dashboard-api'
import {
    getPendingLineItems,
    resetProcessesApiCalls
} from '../redux/api/processesApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchPendingLineItems(pageNum: number) {
    const dispatch = useAppDispatch()

    const processesPendingLineItems = useAppSelector(
        (store) => store.processesApi.getPendingLineItems
    )
    const [pendingLineItems, setPendingLineItems] = useState<
        ModelsPublicReturnLineItem[] | undefined
    >([])

    const totalPending = processesPendingLineItems.response.rowcount

    useEffect(() => {
        dispatch(
            getPendingLineItems({
                offset: pageNum * 10,
                limit: 10
            })
        )
    }, [pageNum])

    useEffect(() => {
        if (processesPendingLineItems.loading === 'succeeded') {
            if (
                pendingLineItems &&
                processesPendingLineItems.response.line_items
            ) {
                setPendingLineItems(
                    pendingLineItems.concat(
                        processesPendingLineItems.response.line_items
                    )
                )
            } else
                setPendingLineItems(
                    processesPendingLineItems.response.line_items
                )
            dispatch(resetProcessesApiCalls())
        } else if (processesPendingLineItems.loading === 'failed') {
            dispatch(resetProcessesApiCalls())
        }
    }, [processesPendingLineItems.response, processesPendingLineItems.loading])

    return { pendingLineItems, totalPending }
}

export default useSearchPendingLineItems
