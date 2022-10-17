import { useEffect } from 'react'
import ComingSoonAnimation from './Lottie/ComingSoon/ComingSoon'
import LogoWide from './assets/images/icons/logoWide.svg'
import { login, resetAuthApiCalls } from './redux/api/authApi'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { LoginInput } from '@itsrever/dashboard-api'

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

    return (
        <div className="flex h-screen w-full flex-col  content-center items-center">
            <img className="h-24  pt-12" src={LogoWide} alt="Rever Logo" />
            <ComingSoonAnimation />
            <h3>Coming soon...</h3>
        </div>
    )
}

export default App
