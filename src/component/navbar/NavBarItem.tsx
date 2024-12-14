import "./NavBar.css";

interface NavBarItem {
  label: string[];
}

const NavBarItem = ({ label }: NavBarItem) => {
  return (
    <>
      {label.map((item, index) => {
        return (
          <a key={index} href="/helloworld" className="navbarItem">
            {item}
          </a>
        );
      })}
    </>
  );
};

export default NavBarItem;
