import { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { NavLink, Outlet } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { setUserData } from '../../redux/features/userData/userDataSlice'

const ProtectedRoute = () => {
    // const [user, setuser] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const userReduxStore = useAppSelector((store) => store.userData.user)
    const user = localStorage.getItem('user')
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (userReduxStore) {
            setIsAuthenticated(true)
        } else if (user) {
            dispatch(setUserData(JSON.parse(user)))
            setIsAuthenticated(true)
        }
    }, [])

    // const isAuthenticated = useAppSelector((store) => store.userData.user)
    if (!isAuthenticated) {
        return (
            <div className="unauthorized">
                <h1>Unauthorized :(</h1>
                <span>
                    <NavLink to="/login">Login</NavLink> to gain access
                </span>
            </div>
        )
    }

    return <Outlet />
}

export default ProtectedRoute
