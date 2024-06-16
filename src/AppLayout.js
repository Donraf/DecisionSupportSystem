import "./AppLayout.css";
import Sidebar from "./components/Sidebar/Sidebar";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="AppLayout">
      <Sidebar />
      <Outlet />
    </div>
  );
}
