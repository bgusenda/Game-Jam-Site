// React
import { Outlet } from "react-router-dom"

// Components
import Header from "./Header"
import Navbar from "./Navbar"

export default function Layout() {
    return (
        <>
            <Header />
            <Navbar />
            <Outlet />
        </>
    )
}