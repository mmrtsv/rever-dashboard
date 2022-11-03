import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRouting/ProtectedRoute'
import LoginPage from './auth/Login.page'
import Layout from './components/LayoutComponent/Layout'
import Home from './pages/Home.page'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<div>About</div>} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
