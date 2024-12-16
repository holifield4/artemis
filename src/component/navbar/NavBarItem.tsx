import { useLocation } from "react-router-dom";
import "./NavBar.css";

interface NavBarItem {
  name: string;
  to: string;
}

const NavBarItem = () => {
  const location = useLocation();
  const routes: NavBarItem[] = [
    {name: "Dashboard", to: "/"},
    {name: "Users", to: "/skeleton"},
    {name: "Merchants", to: "/helloworld"},
    {name: "Transactions", to: "/helloworld"},
    {name: "Vouchers", to: "/helloworld"},
    {name: "Coins", to: "/helloworld"},
    {name: "Assets", to: "/helloworld"},
    {name: "Settings", to: "/helloworld"},
  ]
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
