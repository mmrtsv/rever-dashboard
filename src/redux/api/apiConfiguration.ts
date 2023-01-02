import axios from 'axios'
export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed'

export interface ApiCallBase {
    response: any
    loading: Loading
    error?: any
}

export const initialApiState: ApiCallBase = {
    response: {},
    loading: 'idle'
}

export const axiosInstance = axios.create({
    withCredentials: true
})
