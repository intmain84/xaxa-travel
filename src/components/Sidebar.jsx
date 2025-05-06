import { Outlet } from 'react-router-dom'

function Sidebar() {
    return (
        <main className="relative flex flex-col overflow-y-scroll">
            <div className="flex flex-grow">
                <Outlet />
            </div>
        </main>
    )
}

export default Sidebar
