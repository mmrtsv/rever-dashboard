import axios, { AxiosRequestConfig } from 'axios'

export interface EvalData {
    entityContext?: object
    entityId?: string
    flagID: number
    flagKey?: string
}

export const FlagrEvalPost = async (data: EvalData) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: 'https://flagr.byrever.com/api/v1/evaluation',
        data
    }
    try {
        const { data: response } = await axios.request(requestConfig)
        return response
    } catch (e: any) {
        return { error: e.response.data }
    }
}
