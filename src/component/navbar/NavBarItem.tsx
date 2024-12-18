import { useLocation } from "react-router-dom";
import "./NavBar.css";

export interface NavBarItem {
  name: string;
  to: string;
}
export const routes: NavBarItem[] = [
  {name: "Dashboard", to: "/"},
  {name: "Users", to: "/users"},
  {name: "Merchants", to: "/merchants"},
  {name: "Transactions", to: "/transactions"},
  {name: "Vouchers", to: "/voucers"},
  {name: "Coins", to: "/coins"},
  {name: "Assets", to: "/assets"},
  {name: "Settings", to: "/settings"},
]

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
