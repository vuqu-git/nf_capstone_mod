import styles from './IdentSlideChromaticLogo.module.css';
import Logo from '../../assets/Pupille-Logo.svg?react';
import {useTopHoverDetection} from "../../hooks/useTopHoverDetection.tsx";

interface Props {
    onBack: () => void;
}

export default function IdentSlideChromaticLogo({onBack}: Props) {
    const { TopHoverBar } = useTopHoverDetection({ onTrigger: onBack });

    return (
        <div className={styles.wrapper}>
            <TopHoverBar />

            <div className={styles.logo}>
                <Logo />
            </div>

        </div>
    );
}
