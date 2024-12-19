import { useState } from "react";
import Button from "../button/Button";
import TextField from "../textfield/TextField";
import "./NavBar.css";
import NavBarAvatar from "./NavBarAvatar";
import NavBarItem from "./NavBarItem";
import Sidebar from "./Sidebar";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <nav className="navbar">
        <NavBarItem />
        <div className="navbarSearch">
          <TextField variation="icon" placeholder="Search..." />
        </div>
        <NavBarAvatar />

        <div className="navbarMobile">
            <Button
              label=""
              icon="Bar"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />

          <div className={`sidebar ${isOpen === true ? "open" : "  "}`}>
            <Sidebar />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
