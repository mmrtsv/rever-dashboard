import { useEffect } from 'react'
import {
    getActionRequiredProcesses,
    resetProcessesApiCalls
} from '../redux/api/processesApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchActionRequiredProcesses(
    pageNum: number,
    limit: number,
    freeText: string
) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const processesApiGetProcesses = useAppSelector(
        (store) => store.processesApi.getActionRequiredProcesses
    )
    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    useEffect(() => {
        if (token)
            if (freeText.length > 2) {
                dispatch(
                    getActionRequiredProcesses({
                        freetext: freeText,
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            } else if (freeText.length === 0) {
                dispatch(
                    getActionRequiredProcesses({
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            }
    }, [pageNum, limit, freeText, selectedEcommerce, token])

    useEffect(() => {
        dispatch(resetProcessesApiCalls())
    }, [processesApiGetProcesses.response, processesApiGetProcesses.loading])
}

export default useSearchActionRequiredProcesses
