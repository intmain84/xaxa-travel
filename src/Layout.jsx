import Sidebar from "./components/Sidebar";
import Map from "./components/Map";

function Layout() {
  return (
    <div className="grid grid-cols-[25%_auto]">
      <Sidebar />
      <Map />
    </div>
  );
}

export default Layout;
