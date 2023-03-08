import { useEffect } from 'react'
import { getProcess } from '../redux/api/processesApi'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

export function useSearchProcess(processID: string) {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.userApi.token)

    useEffect(() => {
        if (token)
            dispatch(
                getProcess({
                    processId: processID
                })
            )
    }, [processID, token])
}

export default useSearchProcess
