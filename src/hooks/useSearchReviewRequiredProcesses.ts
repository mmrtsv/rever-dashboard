import { useEffect } from 'react'
import {
    getReviewRequiredProcesses,
    resetProcessesApiCalls
} from '../redux/api/processesApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchReviewRequiredProcesses(
    pageNum: number,
    limit: number,
    freeText: string
) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const processesApiGetProcesses = useAppSelector(
        (store) => store.processesApi.getReviewRequiredProcesses
    )
    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    useEffect(() => {
        if (token)
            if (freeText.length > 2) {
                dispatch(
                    getReviewRequiredProcesses({
                        freetext: freeText,
                        offset: pageNum * limit,
                        limit: limit,
                        ecommerceId: selectedEcommerce
                    })
                )
            } else if (freeText.length === 0) {
                dispatch(
                    getReviewRequiredProcesses({
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

export default useSearchReviewRequiredProcesses
