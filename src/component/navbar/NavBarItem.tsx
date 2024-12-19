import { useLocation } from "react-router-dom";
import "./NavBar.css";
import { routes } from "@/constant/constant";

export interface NavBarItem {
  name: string;
  to: string;
}

const NavBarItem = () => {
  const location = useLocation();
  return (
    <>
      {routes.map((item, index) => {
        const isActive = location.pathname === item.to;
        return (
          <a key={index} href={item.to} className={`navbarItem ${isActive ? "active" : ""}`}>
            {item.name}
          </a>
        );
      })}
    </>
  );
};

export default NavBarItem;
