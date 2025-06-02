// import styles from './IdentSlideParticle.module.css';
// import logo from '../assets/Pupille-Logo.svg'; // Replace with your actual logo path
//
// export default function IdentSlideParticle() {
//     return (
//         <div className={styles.wrapper}>
//             <img src={logo} alt="Pupille-Logo" className={styles.logo} />
//         </div>
//     );
// }

import styles from './IdentSlideGradient.module.css'; // Adjust path as needed
import Logo from '../../assets/Pupille-Logo.svg?react';
import {useTopHoverDetection} from "../../hooks/useTopHoverDetection.tsx";

interface Props {
    onBack: () => void;
}

export default function IdentSlideGradient({onBack}: Props) {
    const { TopHoverBar } = useTopHoverDetection({ onTrigger: onBack });


    return (
        <div className={styles.wrapper}>
            <TopHoverBar />

            <div className={styles.logo}>
                <Logo />
            </div>

            <div className={styles.wave}></div>
            <div className={styles.wave}></div>
            <div className={styles.wave}></div>
        </div>
    );
}
