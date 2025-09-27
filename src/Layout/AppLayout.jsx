import { Outlet } from "react-router-dom";
import Sidebar from "../composantDashbord/Sidebar";

 export default function AppLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 p-4">
        {/* Your routes will be rendered here */}
        <Outlet />
      </main>
    </div>
  );
}
