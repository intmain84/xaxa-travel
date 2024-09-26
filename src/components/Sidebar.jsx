import { Outlet } from "react-router-dom";
import Header from "./Header";

function Sidebar() {
  return (
    <main className="flex flex-col  p-5">
      <Header />
      <Outlet />
    </main>
  );
}

export default Sidebar;
