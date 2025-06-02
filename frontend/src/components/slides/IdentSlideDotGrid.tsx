import styles from './IdentSlideDotGrid.module.css';
import Logo from '../../assets/Pupille-Logo.svg?react';
import {useTopHoverDetection} from "../../hooks/useTopHoverDetection.tsx";

interface Props {
    onBack: () => void;
}

export default function IdentSlideDotGrid({onBack}: Props) {
    const { TopHoverBar } = useTopHoverDetection({ onTrigger: onBack });

    return (
        <div className={styles.wrapper}>
            <TopHoverBar />

            {/*this div displays the grid*/}
            <div className={styles.el}></div>

            <div className={styles.logo}>
                <Logo />
            </div>
        </div>
    );
}
