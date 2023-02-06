import { useEffect } from 'react'
import { getProcesses, resetProcessesApiCalls } from '../redux/api/processesApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchProcesses(
    pageNum: number,
    limit: number,
    freeText: string
) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )
    const processesApiGetProcesses = useAppSelector(
        (store) => store.processesApi.getProcesses
    )

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
        dispatch(resetProcessesApiCalls())
    }, [processesApiGetProcesses.response, processesApiGetProcesses.loading])
}

export default useSearchProcesses
