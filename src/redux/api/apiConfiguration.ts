// import { Configuration, createConfiguration } from '@itsrever/dashboard-api'
// const API_URL = import.meta.env.VITE_API_URL as string

// export default createConfiguration({
//     baseServer: new ServerConfiguration(API_URL, {})
// })

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
