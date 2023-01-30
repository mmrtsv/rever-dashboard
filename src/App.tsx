import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/LayoutComponent/Layout'
import { useTranslation } from 'react-i18next'
import LoadingComponent from './components/Loading/Loading'
import { useAuth0 } from '@auth0/auth0-react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useAppDispatch } from './redux/hooks'
import { setTokenData } from './redux/features/generalData/tokenDataSlice'
import { axiosInstance } from './redux/api/apiConfiguration'
import Mixpanel from './mixpanel/Mixpanel'

const LoginPage = lazy(() => import('./auth/Login.page'))
const Analytics = lazy(() => import('./pages/Financials.page'))
const LineItems = lazy(() => import('./pages/LineItems.page'))
const LineItemDetails = lazy(() => import('./pages/LineItemDetails.page'))
const ReturnsAnalytics = lazy(() => import('./pages/Returns.page'))
const Orders = lazy(() => import('./pages/Orders.page'))
const OrderDetails = lazy(() => import('./pages/OrderDetails.page'))

type Props = {
    component: React.ComponentType<any>
    [key: string]: any
}
function App() {
    const { i18n } = useTranslation()
    const dispatch = useAppDispatch()

    // Language selection
    useEffect(() => {
        const language = navigator.languages.find((lng) => {
            if (lng.substring(0, 2) === 'es' || lng.substring(0, 2) === 'en') {
                return lng
            }
        })
        if (language) {
            i18n.changeLanguage(language.substring(0, 2))
        }
    }, [])

    // Authentication
    const { getAccessTokenSilently, user } = useAuth0()

    useEffect(() => {
        const setAuthToken = async () => {
            try {
                const token = await getAccessTokenSilently()
                axiosInstance.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${token}`
                dispatch(setTokenData(token))
            } catch (error) {
                console.error(error)
            }
        }

        Promise.resolve(setAuthToken())
    }, [getAccessTokenSilently])

    useEffect(() => {
        if (user) {
            Mixpanel.identify(user.email)
            Mixpanel.people({ $email: user.email, $name: user.nickname })
        }
    }, [user])

    const ProtectedRoute = ({ component, ...args }: Props) => {
        const Component = withAuthenticationRequired(component, args)
        return <Component />
    }

    return (
        <Router>
            <Suspense fallback={<LoadingComponent loading={true} />}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<Layout />}>
                        {/* <Route
                            path="/"
                            element={<ProtectedRoute component={LineItems} />}
                        /> */}
                        <Route
                            path="/"
                            element={<ProtectedRoute component={Orders} />}
                        />
                        <Route
                            path="/items"
                            element={<ProtectedRoute component={LineItems} />}
                        />
                        <Route
                            path="/return/:id"
                            element={
                                <ProtectedRoute component={OrderDetails} />
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={<ProtectedRoute component={Analytics} />}
                        />
                        <Route
                            path="/returns-analytics"
                            element={
                                <ProtectedRoute component={ReturnsAnalytics} />
                            }
                        />
                        <Route
                            path="/details/:id"
                            element={
                                <ProtectedRoute component={LineItemDetails} />
                            }
                        />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
