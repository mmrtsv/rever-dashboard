import { useEffect } from 'react'
import { getPendingProcesses } from '../redux/api/processesApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchPendingProcesses(
    pageNum: number,
    limit: number,
    freeText: string
) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

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
}

export default useSearchPendingProcesses
