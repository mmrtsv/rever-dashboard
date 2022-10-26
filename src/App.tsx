import { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import ProtectedRoute from './auth/ProtectedRouting/ProtectedRoute'
import LoginPage from './auth/Login.page'
import { setUserData } from './redux/features/userData/userDataSlice'
import { resetAuthApiCalls } from './redux/api/authApi'
import Layout from './components/LayoutComponent/Layout'
function App() {
    const dispatch = useAppDispatch()

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<div>Home</div>} />
                        <Route path="/about" element={<div>About</div>} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
