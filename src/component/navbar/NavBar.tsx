import TextField from "../textfield/TextField";
import "./NavBar.css";
import NavBarAvatar from "./NavBarAvatar";
import NavBarItem from "./NavBarItem";

const NavBar = () => {
  const navbarItem = [
    "Dashboard",
    "Users",
    "Merchants",
    "Transactions",
    "Vouchers",
    "Coins",
    "Assets",
    "Settings",
  ];

  return (
    <>
      <nav className="navbar">
        <NavBarItem label={navbarItem} />
        <TextField placeholder="Search..." />
        <NavBarAvatar />
      </nav>
    </>
  );
};

export default NavBar;
