import { Outlet } from 'react-router-dom'
import Header from './Header'

function Sidebar() {
    return (
        <main className="relative overflow-y-scroll">
            <Header />
            <Outlet />
        </main>
    )
}

export default Sidebar
