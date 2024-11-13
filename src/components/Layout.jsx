import Sidebar from './Sidebar'
import Map from './Map'

function Layout() {
    return (
        <div className="bg-dark-green text-light-blue grid h-full grid-cols-[auto_450px]">
            <Map />
            <Sidebar />
        </div>
    )
}

export default Layout
