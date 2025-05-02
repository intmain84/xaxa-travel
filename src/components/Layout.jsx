import Sidebar from './Sidebar'
import Map from './Map'
import Header from './Header'

function Layout() {
    return (
        <>
            <Header />
            <div className="grid h-[calc(100lvh-72px)] grid-cols-2 bg-[#F0EEEC]">
                <Sidebar />
                <Map />
            </div>
        </>
    )
}

export default Layout
