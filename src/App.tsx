import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/LayoutComponent/Layout'
import LoadingComponent from './components/Loading/Loading'
import { useAuth0 } from '@auth0/auth0-react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useAppDispatch } from './redux/hooks'
import { setTokenData } from './redux/api/userApi'
import { axiosInstance } from './redux/api/apiConfiguration'
import Mixpanel from './mixpanel/Mixpanel'

const Analytics = lazy(() => import('./pages/Financials.page'))
const LineItems = lazy(() => import('./pages/LineItems.page'))
const LineItemDetails = lazy(() => import('./pages/LineItemDetails.page'))
const ReturnsAnalytics = lazy(() => import('./pages/Returns.page'))
const Processes = lazy(() => import('./pages/Processes.page'))
const ProcessDetails = lazy(() => import('./pages/ProcessDetails.page'))
const Transit = lazy(() => import('./pages/TransitAnalytics.page'))

type Props = {
    component: React.ComponentType<any>
    [key: string]: any
}
function App() {
    const dispatch = useAppDispatch()

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
                    <Route element={<Layout />}>
                        <Route
                            path="/"
                            element={<ProtectedRoute component={Processes} />}
                        />
                        <Route
                            path="/return/:id"
                            element={
                                <ProtectedRoute component={ProcessDetails} />
                            }
                        />
                        <Route
                            path="/items"
                            element={<ProtectedRoute component={LineItems} />}
                        />
                        <Route
                            path="/details/:id"
                            element={
                                <ProtectedRoute component={LineItemDetails} />
                            }
                        />
                        <Route
                            path="/financials"
                            element={<ProtectedRoute component={Analytics} />}
                        />
                        <Route
                            path="/returns-analytics"
                            element={
                                <ProtectedRoute component={ReturnsAnalytics} />
                            }
                        />
                        <Route
                            path="/transit-analytics"
                            element={<ProtectedRoute component={Transit} />}
                        />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
