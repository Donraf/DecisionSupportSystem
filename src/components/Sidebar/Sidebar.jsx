import { Link } from "react-router-dom";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="title">Организация</div>
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => (window.location.pathname = val.link)}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
          
        })}
      </ul>
    </div>
  );
}
