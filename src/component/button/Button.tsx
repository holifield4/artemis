import Icon from "@/assets/icon/Icon";
import "@/component/button/Button.css";
import { useEffect, useState } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: string;
  active?: boolean;
  borderless?: boolean;
  options?: ButtonOptions[];
  onOptionSelect?: (value: string | number) => void;
  checkBoxOptions?: ButtonCheckBoxOptions[];
  onChecked?: (checkedOptions: string[]) => void;
  checkedOptions?: string[];
}

export interface ButtonOptions {
  name: string;
  value: string | number;
}

export interface ButtonCheckBoxOptions {
  name: string;
  value: string;
}

const Button = ({
  label,
  icon,
  borderless,
  onClick,
  disabled,
  options,
  onOptionSelect,
  checkBoxOptions,
  checkedOptions,
  onChecked,
}: ButtonProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [optionsLabel, setOptinsLabel] = useState<string>(label);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>(checkedOptions!);
  
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowOptions((prev) => !prev);
    onClick?.(e);
  };

  const handleOptionClick = (option: ButtonOptions) => {
    setOptinsLabel(option.name);
    onOptionSelect?.(option.value);
    setShowOptions(false);
    return option.value;
  };

  useEffect(() => {
    if (onChecked) {
      onChecked(selectedCheckboxes);
    }
  }, [selectedCheckboxes, onChecked]);

  const handleCheckBoxChange = (option: ButtonCheckBoxOptions) => {
    setSelectedCheckboxes((prev) => {
      const isChecked = prev.includes(option.value);
      return isChecked
      ? prev.filter((value) => value !== option.value)
      : [...prev, option.value];
    });
  };

  /**
   * close options when clicking outside
   */
  useEffect(() => {
    const handleOutsideClick = () => setShowOptions(false);
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      <div>
        <button
          className={`button ${borderless === true && "borderless"} ${
            disabled === true && "disabled"
          }`}
          onClick={handleButtonClick}
          disabled={disabled}
        >
          {icon && <Icon icon={icon} />}
          {optionsLabel}
        </button>

        {/* Dropdown Options */}
        {showOptions && options && !checkBoxOptions && (
          <div className={`buttonOptionsWrapper`}>
            {options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(option)}>
                {option.name}
              </button>
            ))}
          </div>
        )}

        {/* Checkbox Options */}
        {showOptions && checkBoxOptions && (
          <div className={`buttonOptionsWrapper`}>
            {checkBoxOptions.map((option, index) => (
              <div key={index} className="checkboxOption">
                <input
                  type="checkbox"
                  id={option.value}
                  checked={selectedCheckboxes.includes(option.value)}
                  onChange={() => handleCheckBoxChange(option)}
                />
                <label htmlFor={option.value}>{option.name}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Button;
