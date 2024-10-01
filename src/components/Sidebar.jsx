import { Outlet } from "react-router-dom";
import Header from "./Header";

function Sidebar() {
  return (
    <main className="grid grid-rows-[auto_auto] p-5">
      <Header />
      <Outlet />
    </main>
  );
}

export default Sidebar;
