import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './HeaderComponent/Header'
import LoadingModal from '../Loading/LoadingModal'
import { useAppSelector } from '../../redux/hooks'

const Layout = () => {
    // Loading Modal Logic
    const [isLoading, setIsLoading] = useState(true)
    const [authApiLoading, processesApiLoading] = [
        useAppSelector((store) => store.authApi.login.loading),
        useAppSelector((store) => store.processesApi.getProcesses.loading)
    ]
    useEffect(() => {
        if (authApiLoading === 'pending' || processesApiLoading === 'pending') {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [authApiLoading, processesApiLoading])

    return (
        <>
            <Header />
            <LoadingModal loading={isLoading} />
            <Outlet />
        </>
    )
}

export default Layout
