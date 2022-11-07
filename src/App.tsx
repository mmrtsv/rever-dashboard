import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRouting/ProtectedRoute'
import Layout from './components/LayoutComponent/Layout'

const LoginPage = lazy(() => import('./auth/Login.page'))
const Home = lazy(() => import('./pages/Home.page'))
const Orders = lazy(() => import('./pages/Orders.page'))

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/orders" element={<Orders />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
