import { useEffect, useState } from 'react';
import './Footer.css';
import { getLocalTimeFormat } from '../../helper/DateAndTimeHelper';

const Footer = () => {
    const [currentDateAndTime, setCurrentDateAndTime] = useState<string>(getLocalTimeFormat(new Date()));

    useEffect(() => {
        const updateEverySecond = setInterval(() => {
            setCurrentDateAndTime(getLocalTimeFormat(new Date()));
        }, 1000);

        return () => clearInterval(updateEverySecond);
    },[])

    return (
        <footer className="footer">
            <p>Copyright 2023 Qbeep | All right reserved | {currentDateAndTime}</p>
        </footer>
    )
}

export default Footer;