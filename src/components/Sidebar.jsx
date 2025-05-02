import { Outlet } from 'react-router-dom'

function Sidebar() {
    return (
        <main className="relative flex flex-col">
            <main className="flex flex-grow">
                <Outlet />
            </main>
        </main>
    )
}

export default Sidebar
