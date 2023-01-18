import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/LayoutComponent/Layout'
import { useTranslation } from 'react-i18next'
import Loading from './components/Loading/Loading'
import { useAuth0 } from '@auth0/auth0-react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useAppDispatch } from './redux/hooks'
import { setTokenData } from './redux/features/generalData/tokenDataSlice'
import { axiosInstance } from './redux/api/apiConfiguration'
import NotAvailable from './pages/NotAvailable'
import Mixpanel from './mixpanel/Mixpanel'
import device from './utils/device'

const LoginPage = lazy(() => import('./auth/Login.page'))
const Analytics = lazy(() => import('./pages/Financials.page'))
const LineItems = lazy(() => import('./pages/LineItems.page'))
const LineItemsByStatus = lazy(() => import('./pages/LineItemsByStatus.page'))
const LineItemDetails = lazy(() => import('./pages/LineItemDetails.page'))
const ReturnsAnalytics = lazy(() => import('./pages/Returns.page'))

type Props = {
    component: React.ComponentType<any>
    [key: string]: any
}
function App() {
    // Language selection
    const { i18n } = useTranslation()
    const dispatch = useAppDispatch()
    const userLocale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language

    useEffect(() => {
        if (userLocale.substring(0, 2) === 'es') {
            i18n.changeLanguage('es')
        }
    }, [])
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

    const width = screen.availWidth

    return (
        <Router>
            <Suspense fallback={<Loading loading={true} />}>
                {width < 768 ? (
                    <NotAvailable />
                ) : (
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />

                        <Route element={<Layout />}>
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute component={LineItems} />
                                }
                            />
                            <Route
                                path="/orders"
                                element={
                                    <ProtectedRoute
                                        component={LineItemsByStatus}
                                    />
                                }
                            />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute component={Analytics} />
                                }
                            />
                            <Route
                                path="/returns"
                                element={
                                    <ProtectedRoute
                                        component={ReturnsAnalytics}
                                    />
                                }
                            />
                            <Route
                                path="/details/:id"
                                element={
                                    <ProtectedRoute
                                        component={LineItemDetails}
                                    />
                                }
                            />
                        </Route>
                    </Routes>
                )}
            </Suspense>
        </Router>
    )
}

export default App
