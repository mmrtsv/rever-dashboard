import { useEffect } from 'react'
import ComingSoonAnimation from './Lottie/ComingSoon/ComingSoon'
import LogoWide from './assets/images/icons/logoWide.svg'
import { login, logout, resetAuthApiCalls } from './redux/api/authApi'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { LoginInput } from '@itsrever/dashboard-api'
import processesApi, {
    getProcesses,
    resetProcessesApiCalls
} from './redux/api/processesApi'

function App() {
    const dispatch = useAppDispatch()
    const ProcessApi = useAppSelector((store) => store.processesApi)

    useEffect(() => {
        if (ProcessApi.getProcesses.loading === 'succeeded') {
            // dispatch(resetProcessesApiCalls())
            console.log(typeof ProcessApi.getProcesses.response)
        }
    }, [ProcessApi.getProcesses.loading])
    const handleLogin = () => {
        dispatch(
            login({
                username: 'admin@oky.com',
                password: 'Rever2022DashboardPassword'
            })
        )
    }
    const handleLogout = () => {
        dispatch(logout())
    }

    const handleContinue = () => {
        dispatch(getProcesses())
    }

    return (
        <div className="flex h-screen w-full flex-col  content-center items-center">
            <img
                className="h-24  pt-12"
                src={LogoWide}
                alt="Rever Logo"
                onClick={handleContinue}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            {/* <ComingSoonAnimation /> */}
            {/* <h3>Coming soon...</h3> */}
        </div>
    )
}

export default App
