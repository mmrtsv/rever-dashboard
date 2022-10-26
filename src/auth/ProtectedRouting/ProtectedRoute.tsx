import { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { setUserData } from '../../redux/features/userData/userDataSlice'
import ComingSoonAnimation from '../../assets/Lottie/ComingSoon/ComingSoon'

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const userReduxStore = useAppSelector((store) => store.userData.user)
    const user = localStorage.getItem('user')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (userReduxStore) {
            setIsAuthenticated(true)
        } else if (user) {
            dispatch(setUserData(JSON.parse(user)))
            setIsAuthenticated(true)
        } else {
            navigate('/login')
        }
    }, [])

    if (!isAuthenticated) {
        return <ComingSoonAnimation />
    }

    return <Outlet />
}

export default ProtectedRoute
