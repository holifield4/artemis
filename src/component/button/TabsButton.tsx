import "@/component/button/TabsButton.css";
import { ButtonProps } from "./Button";

const TabsButton = ({ label, active, onClick }: ButtonProps) => {
  return (
    <button className={`tabsButton ${active === true && "active"}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default TabsButton;
