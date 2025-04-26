import Sidebar from './Sidebar'
import Map from './Map'

function Layout() {
    return (
        <div className="grid h-full grid-cols-[auto_700px]">
            <Sidebar />
            <Map />
        </div>
    )
}

export default Layout
