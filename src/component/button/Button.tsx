import Icon from '@/assets/icon/Icon';
import '@/component/button/Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: string;
    active?: boolean;
    borderless?: boolean;
}

const Button = ({label, icon, borderless, onClick, disabled}: ButtonProps) => {
    return (
        <button className={`button ${borderless === true && "borderless"} ${disabled === true && "disabled"}`} onClick={onClick} disabled={disabled}>
            {icon && <Icon icon={icon}/>}
            {label}
        </button>
    )
}

export default Button;