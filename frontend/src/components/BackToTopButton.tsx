import { useEffect } from "react";
import './BackToTopButton.css'; // Create a CSS file for the button

interface BackToTopButtonProps {
    scrollThreshold?: number; // Optional: customize the scroll threshold
}

export default function BackToTopButton({ scrollThreshold = 300 }: BackToTopButtonProps) {
    useEffect(() => {
        const btn = document.getElementById('backToTopBtn');

        const handleScroll = () => {
            if (!btn) return;
            if (window.scrollY > scrollThreshold) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollThreshold]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            id="backToTopBtn"
            onClick={scrollToTop}
            className="back-to-top-button" // Apply a CSS class for styling
        >
            &#9650;️
        </button>
    );
}