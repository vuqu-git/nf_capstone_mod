import styles from './IdentSlide.module.css';
import logo from '../assets/Pupille-Logo.svg'; // Replace with your actual logo path

export default function IdentSlide() {
    return (
        <div className={styles.wrapper}>
            <img src={logo} alt="Pupille-Logo" className={styles.logo} />
        </div>
    );
}