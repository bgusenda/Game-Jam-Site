// React
import { Outlet } from "react-router-dom"

// Components
import Navbar from "./Navbar"

export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}