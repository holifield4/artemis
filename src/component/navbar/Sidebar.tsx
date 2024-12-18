import { useLocation } from "react-router-dom";
import "./NavBar.css";
import { routes } from "./NavBarItem";

const Sidebar = () => {
const location = useLocation();
  return (
    <>
      {routes.map((item, index) => {
        const isActive = location.pathname === item.to;
        return (
          <a
            key={index}
            href={item.to}
            className={`sidebarItem ${isActive ? "active" : ""}`}
          >
            {item.name}
          </a>
        );
      })}
    </>
  );
};

export default Sidebar;
