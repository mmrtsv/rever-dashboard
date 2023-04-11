import React, { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './HeaderComponent/Header'
import LoadingModal from '../components/Loading/LoadingModal'
import { Toaster } from '@itsrever/design-system'
import { useAppSelector } from '@/redux/hooks'
import { useSearchMe } from '@/hooks'

const Layout = () => {
    const me = useAppSelector((state) => state.userApi.getMe.response)
    useSearchMe()

    const [
        userApi,
        reviewsApi,
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
        useAppSelector((store) => store.reviewsApi.createReview.loading),
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

    const Loading = useMemo(() => {
        if (
            userApi === 'pending' ||
            reviewsApi === 'pending' ||
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
            return true
        }
        if (me) return false
        return true
    }, [
        me,
        reviewsApi,
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
            <LoadingModal loading={Loading} />
            <Outlet />
            <Toaster />
        </>
    )
}

export default Layout
