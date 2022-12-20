import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRouting/ProtectedRoute'
import Layout from './components/LayoutComponent/Layout'
import { useTranslation } from 'react-i18next'
import Loading from './components/Loading/Loading'

const LoginPage = lazy(() => import('./auth/Login.page'))
// const Home = lazy(() => import('./pages/Home.page'))
const Orders = lazy(() => import('./pages/Orders.page'))
const OrdersByStatus = lazy(() => import('./pages/LineItemsByStatus.page'))
const LineItemDetails = lazy(() => import('./pages/LineItemDetails.page'))

function App() {
    // Language selection
    const { i18n } = useTranslation()
    const userLocale =
        navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language

    useEffect(() => {
        if (userLocale.substring(0, 2) === 'es') {
            i18n.changeLanguage('es')
        }
    }, [])

    return (
        <Router>
            <Suspense fallback={<Loading loading={true} />}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Orders />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route
                                path="/dashboard"
                                element={<OrdersByStatus />}
                            />
                            <Route
                                path="/details/:id"
                                element={<LineItemDetails />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
