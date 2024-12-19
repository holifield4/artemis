import Icon from "../../assets/icon/Icon";
import "./TextField.css";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variation: "icon" | "normal";
  label?: string;
}

const TextField = (props: TextFieldProps) => {
  return (
    <>
      <div
        className={`TextField ${
          props.variation === "normal" ? "normal" : "hasIcon"
        }`}
      >
        {props.variation === "icon" && (
          <div className="icon">
            <Icon icon="MagnifyingGlass" />
          </div>
        )}
        <label htmlFor={props.id}>{props.label}</label>
        <input
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          type={props.type}
        />
      </div>
    </>
  );
};

export default TextField;
