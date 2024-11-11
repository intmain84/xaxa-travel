import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer.jsx'

function Sidebar() {
    return (
        <main className="relative overflow-y-scroll">
            <Header />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Sidebar
