import { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { setUserData } from '../../redux/features/generalData/userDataSlice'
import Loading from '../../components/Loading/Loading'
import { useAuth0 } from '@auth0/auth0-react'
import { setTokenData } from '../../redux/features/generalData/tokenDataSlice'
import axios from 'axios'

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {
        getAccessTokenWithPopup,
        isAuthenticated,
        loginWithRedirect,
        getAccessTokenSilently
    } = useAuth0()

    if (!isAuthenticated) {
        navigate('/login')
    }

    return <Outlet />
}

export default ProtectedRoute
