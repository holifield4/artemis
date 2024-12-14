import Icon from "../../assets/icon/Icon";
import "./TextField.css";

const TextField = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      <div className="TextField">
        <div className="icon">
          <Icon icon="MagnifyingGlass" />
        </div>
        <input
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </>
  );
};

export default TextField;
