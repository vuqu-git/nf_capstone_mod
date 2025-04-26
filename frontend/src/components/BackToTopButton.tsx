// import { useEffect } from "react";
// import './BackToTopButton.css'; // Create a CSS file for the button
//
// interface BackToTopButtonProps {
//     scrollThreshold?: number; // Optional: customize the scroll threshold
//
// }
//
// export default function BackToTopButton({ scrollThreshold = 300 }: BackToTopButtonProps) {
//     useEffect(() => {
//         const btn = document.getElementById('backToTopBtn');
//
//         const handleScroll = () => {
//             if (!btn) return;
//             if (window.scrollY > scrollThreshold) {
//                 btn.classList.add('show');
//             } else {
//                 btn.classList.remove('show');
//             }
//         };
//
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [scrollThreshold]);
//
//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };
//
//     return (
//         <button
//             id="backToTopBtn"
//             onClick={scrollToTop}
//             className="back-to-top-button" // Apply a CSS class for styling
//         >
//             &#9650;️
//         </button>
//     );
// }

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import { useEffect, useRef } from "react";
// import './BackToTopButton.css';
//
// interface BackToTopButtonProps {
//     scrollThreshold?: number;
//     parentId: string; // NEW PROP: ID of the parent container
// }
//
// export default function BackToTopButton({
//                                             scrollThreshold = 300,
//                                             parentId // NEW PROP
//                                         }: BackToTopButtonProps) {
//     const btnRef = useRef<HTMLButtonElement>(null); // NEW: Ref for button
//
//     useEffect(() => {
//         const btn = btnRef.current;
//         const parent = document.getElementById(parentId); // NEW: Get parent
//
//         const updatePosition = () => {
//             if (!btn || !parent) return;
//
//             // NEW: Calculate horizontal position relative to parent
//             const parentRect = parent.getBoundingClientRect();
//             const rightOffset = window.innerWidth - parentRect.right + 50;
//             btn.style.right = `${rightOffset}px`;
//         };
//
//         const handleScroll = () => {
//             if (!btn) return;
//             btn.classList.toggle('show', window.scrollY > scrollThreshold);
//         };
//
//         // NEW: Initial position + update on resize/parent changes
//         updatePosition();
//         window.addEventListener('resize', updatePosition);
//         window.addEventListener('scroll', handleScroll);
//
//         return () => {
//             window.removeEventListener('resize', updatePosition);
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, [scrollThreshold, parentId]); // NEW: Added parentId dependency
//
//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };
//
//     return (
//         <button
//             ref={btnRef} // NEW: Attach ref
//             id="backToTopBtn"
//             onClick={scrollToTop}
//             className="back-to-top-button"
//             style={{
//                 position: 'fixed', // CHANGED: Now fixed for vertical positioning
//                 bottom: '2rem' // Keeps button at viewport bottom
//             }}
//         >
//             &#9650;️
//         </button>
//     );
// }

import { useEffect, useRef } from "react";
import './BackToTopButton.css';

interface BackToTopButtonProps {
    scrollThreshold?: number;
    parentId: string; // ID of the parent container
    rightPercent?: number; // Percentage (0.05 for 5%) offset from parent's right edge
}

export default function BackToTopButton({
                                            scrollThreshold = 300,
                                            parentId,
                                            rightPercent = 0 // Default: flush with parent's right edge
                                        }: BackToTopButtonProps) {
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const btn = btnRef.current;
        const parent = document.getElementById(parentId);

        const updatePosition = () => {
            if (!btn || !parent) return;
            const parentRect = parent.getBoundingClientRect();
            const parentWidth = parentRect.width;

            // Calculate pixel offset as a percentage of parent's width
            const pixelOffset = parentWidth * rightPercent;
            // Position button relative to parent's right edge, plus offset
            const rightOffset = window.innerWidth - parentRect.right + pixelOffset;

            btn.style.right = `${rightOffset}px`;
        };

        const handleScroll = () => {
            if (!btn) return;
            btn.classList.toggle('show', window.scrollY > scrollThreshold);
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollThreshold, parentId, rightPercent]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            ref={btnRef}
            id="backToTopBtn"
            onClick={scrollToTop}
            className="back-to-top-button"
            style={{
                position: 'fixed',
                bottom: '2rem' // !!!!! Keeps button at viewport bottom !!!!!
            }}
        >
            &#9650;️
        </button>
    );
}
