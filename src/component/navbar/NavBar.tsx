import TextField from "../textfield/TextField";
import "./NavBar.css";
import NavBarAvatar from "./NavBarAvatar";
import NavBarItem from "./NavBarItem";

const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <NavBarItem />
        <TextField placeholder="Search..." />
        <NavBarAvatar />
      </nav>
    </>
  );
};

export default NavBar;
