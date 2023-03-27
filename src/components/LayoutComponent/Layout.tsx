import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './HeaderComponent/Header'
import LoadingModal from '../Loading/LoadingModal'
import { Toaster } from '@itsrever/design-system'
import { useAppSelector } from '@/redux/hooks'
import useSearchMe from '@/hooks/useSearchMe'

const Layout = () => {
    // Call me
    const me = useAppSelector((state) => state.userApi.getMe.response)
    useSearchMe()

    // Loading Modal Logic
    const [isLoading, setIsLoading] = useState(true)

    const [
        userApi,
        lineItemsApiGLI,
        lineItemsApiGLIs,
        lineItemsApiGPLIs,
        lineItemsApiGCLIs,
        processesApiGP,
        processesApiGPs,
        processesApiGPPs,
        processesApiGRPs,
        processesApiGCPs
    ] = [
        useAppSelector((store) => store.userApi.getMe.loading),
        useAppSelector((store) => store.lineItemsApi.getLineItem.loading),
        useAppSelector((store) => store.lineItemsApi.getLineItems.loading),
        useAppSelector(
            (store) => store.lineItemsApi.getPendingLineItems.loading
        ),
        useAppSelector(
            (store) => store.lineItemsApi.getCompletedLineItems.loading
        ),
        useAppSelector((store) => store.processesApi.getProcess.loading),
        useAppSelector((store) => store.processesApi.getProcesses.loading),
        useAppSelector(
            (store) => store.processesApi.getPendingProcesses.loading
        ),
        useAppSelector(
            (store) => store.processesApi.getReviewRequiredProcesses.loading
        ),
        useAppSelector(
            (store) => store.processesApi.getCompletedProcesses.loading
        )
    ]
    useEffect(() => {
        if (
            userApi === 'pending' ||
            lineItemsApiGLI === 'pending' ||
            lineItemsApiGLIs === 'pending' ||
            lineItemsApiGPLIs === 'pending' ||
            lineItemsApiGCLIs === 'pending' ||
            processesApiGP === 'pending' ||
            processesApiGPs === 'pending' ||
            processesApiGPPs === 'pending' ||
            processesApiGRPs === 'pending' ||
            processesApiGCPs === 'pending'
        ) {
            setIsLoading(true)
        } else {
            if (me) {
                setIsLoading(false)
            }
        }
    }, [
        me,
        userApi,
        lineItemsApiGLI,
        lineItemsApiGLIs,
        lineItemsApiGPLIs,
        lineItemsApiGCLIs,
        processesApiGP,
        processesApiGPs,
        processesApiGPPs,
        processesApiGRPs,
        processesApiGCPs
    ])

    return (
        <>
            <Header />
            <LoadingModal loading={isLoading} />
            <Outlet />
            <Toaster />
        </>
    )
}

export default Layout
