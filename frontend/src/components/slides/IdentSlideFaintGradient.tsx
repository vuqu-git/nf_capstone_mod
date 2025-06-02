import styles from './IdentSlideFaintGradient.module.css';
// import logo from '../../assets/Pupille-Logo.svg';
import Logo from '../../assets/Pupille-Logo.svg?react';
import {useTopHoverDetection} from "../../hooks/useTopHoverDetection.tsx";

interface Props {
    onBack: () => void;
}

export default function IdentSlideFaintGradient({onBack}: Props) {
    const { TopHoverBar } = useTopHoverDetection({ onTrigger: onBack });

    return (
        <div className={styles.wrapper}>
            <TopHoverBar />
            {/*<img src={logo} alt="Pupille-Logo" className={styles.logo} />*/}
            <div className={styles.logo}>
                <Logo />
            </div>
        </div>
    );
}
