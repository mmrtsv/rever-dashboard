import { useEffect, useState } from 'react'
import { getProcess } from '../redux/api/processesApi'
import { useAppSelector } from '../redux/hooks'
import { ModelsPublicReturnProcess } from '@itsrever/dashboard-api'

function useSearchProcess(processId: string) {
    const token = useAppSelector((state) => state.userApi.token)
    const [process, setProcess] = useState<ModelsPublicReturnProcess>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (token) {
            getProcess({ processId }).then((data) => {
                if (data.processes) {
                    setProcess(data.processes[0])
                } else {
                    // TODO: Add sentry logging here
                    console.warn('No process found with id: ', processId)
                }
            })
        }
    }, [processId, token])

    useEffect(() => {
        if (process) {
            setLoading(false)
        }
    }, [process])

    return { process, loading }
}

export { useSearchProcess }
