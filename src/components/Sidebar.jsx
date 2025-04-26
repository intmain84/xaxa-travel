import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer.jsx'

function Sidebar() {
    return (
        <main className="relative flex flex-col overflow-y-scroll">
            <Header />
            <main className="flex flex-grow">
                <Outlet />
            </main>
        </main>
    )
}

export default Sidebar
