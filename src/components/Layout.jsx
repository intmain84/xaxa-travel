import Sidebar from './Sidebar'
import Map from './Map'
import Header from './Header'

function Layout() {
    return (
        <>
            <Header />
            <div className="grid h-full grid-cols-[auto_700px]">
                <Sidebar />
                <Map />
            </div>
        </>
    )
}

export default Layout
