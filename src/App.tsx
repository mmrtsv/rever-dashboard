import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import ProtectedRoute from './auth/ProtectedRouting/ProtectedRoute'
import Layout from './components/LayoutComponent/Layout'
import { useTranslation } from 'react-i18next'
import Loading from './components/Loading/Loading'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useAppDispatch } from './redux/hooks'
import { setTokenData } from './redux/features/generalData/tokenDataSlice'
import { setAccessToken } from './redux/api/lineItemsApi'

const LoginPage = lazy(() => import('./auth/Login.page'))
// const Home = lazy(() => import('./pages/Home.page'))
const Orders = lazy(() => import('./pages/Orders.page'))
const OrdersByStatus = lazy(() => import('./pages/LineItemsByStatus.page'))
const LineItemDetails = lazy(() => import('./pages/LineItemDetails.page'))

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
    const { getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        const setAuthToken = async () => {
            try {
                const token = await getAccessTokenSilently()
                // console.log(token)
                localStorage.setItem('accessToken', token)
                setAccessToken(token)
                dispatch(setTokenData(token))
            } catch (error) {
                console.error(error)
            }
        }

        Promise.resolve(setAuthToken())
    }, [getAccessTokenSilently])

    const ProtectedRoute = ({ component, ...args }: Props) => {
        const Component = withAuthenticationRequired(component, args)
        return <Component />
    }
    return (
        <Router>
            <Suspense fallback={<Loading loading={true} />}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    {/* <Route element={<ProtectedRoute />}> */}
                    <Route element={<Layout />}>
                        <Route
                            path="/"
                            element={<ProtectedRoute component={Orders} />}
                        />
                        <Route
                            path="/orders"
                            element={<ProtectedRoute component={Orders} />}
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute component={OrdersByStatus} />
                            }
                        />
                        <Route
                            path="/details/:id"
                            element={
                                <ProtectedRoute component={LineItemDetails} />
                            }
                        />
                    </Route>
                    {/* </Route> */}
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
