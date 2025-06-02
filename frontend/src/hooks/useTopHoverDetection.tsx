// hooks/useTopHoverDetection.ts
import { useState, useEffect } from 'react';
import '../components/slides/TopHoverBar.css';


interface UseTopHoverDetectionProps {
    onTrigger: () => void;
    hoverHeight?: number; // Optional prop for customizable hover area height
}

export function useTopHoverDetection({ onTrigger, hoverHeight = 44 }: UseTopHoverDetectionProps) {
    const [isTopHovering, setIsTopHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (event.clientY <= hoverHeight) {
                setIsTopHovering(true);
            } else {
                setIsTopHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [hoverHeight]);

    const TopHoverBar = () => (
        isTopHovering ? (
                <div
                    className="topHoverBar" // define this CSS class globally or import it
                    style={{ height: `${hoverHeight}px` }} // style prop here to set dynamic height
                    onClick={onTrigger}
                    role="button"
                    aria-label="Stop Preview"
                    tabIndex={0}
                >
                    Click here to stop preview.
                </div>
            ) : null
        );

    return { isTopHovering, TopHoverBar };
}