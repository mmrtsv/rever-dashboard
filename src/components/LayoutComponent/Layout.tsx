import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './HeaderComponent/Header'
import LoadingModal from '../Loading/LoadingModal'
import { useAppSelector } from '../../redux/hooks'

const Layout = () => {
    // Loading Modal Logic
    const [isLoading, setIsLoading] = useState(true)
    const [
        authApiLoading,
        processesApiLoading,
        lineItemsLoading,
        pendingLineItemsLoading,
        completedLineItemsLoading
    ] = [
        useAppSelector((store) => store.authApi.login.loading),
        useAppSelector((store) => store.processesApi.getProcesses.loading),
        useAppSelector((store) => store.lineItemsApi.getLineItems.loading),
        useAppSelector(
            (store) => store.lineItemsApi.getPendingLineItems.loading
        ),
        useAppSelector(
            (store) => store.lineItemsApi.getCompletedLineItems.loading
        )
    ]
    useEffect(() => {
        if (
            authApiLoading === 'pending' ||
            processesApiLoading === 'pending' ||
            lineItemsLoading === 'pending' ||
            pendingLineItemsLoading === 'pending' ||
            completedLineItemsLoading === 'pending'
        ) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [
        authApiLoading,
        processesApiLoading,
        lineItemsLoading,
        pendingLineItemsLoading,
        completedLineItemsLoading
    ])

    return (
        <>
            <Header />
            <LoadingModal loading={isLoading} />
            <Outlet />
        </>
    )
}

export default Layout
