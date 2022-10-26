import { Outlet } from 'react-router-dom'
import Header from '../HeaderComponent/Header'
import SideBar from '../SideBarComponent/SideBar'
const Layout = () => {
    return (
        <>
            <Header />
            <SideBar />
            <Outlet />
        </>
    )
}

export default Layout
