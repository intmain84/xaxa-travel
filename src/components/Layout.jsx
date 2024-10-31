import Sidebar from './Sidebar'
import Map from './Map'

function Layout() {
    return (
        <div className="grid h-full grid-cols-[450px_auto]">
            <Sidebar />
            <Map />
        </div>
    )
}

export default Layout
