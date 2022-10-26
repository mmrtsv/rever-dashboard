import { useEffect } from 'react'
import ComingSoonAnimation from './assets/Lottie/ComingSoon/ComingSoon'
import LogoWide from './assets/images/icons/logoWide.svg'
import { login, resetAuthApiCalls } from './redux/api/authApi'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { LoginInput } from '@itsrever/dashboard-api'
import { getProcesses } from './redux/api/processesApi'

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(
            login({
                username: 'admin@partner.com',
                password: 'Rever2022DashboardPassword'
            })
        )
    }, [])
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
            <ComingSoonAnimation />
            <h3>Coming soon...</h3>
        </div>
    )
}

export default App
