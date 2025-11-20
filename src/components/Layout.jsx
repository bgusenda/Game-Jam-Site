// React
import { Outlet } from 'react-router-dom'

// Components
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}