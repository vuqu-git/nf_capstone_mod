import { useEffect, useState } from "react";

export function useScrollPersistence(
    storageKey: string,
    isReady: boolean,
    revealDelay = 350
): boolean {
    const [readyToRender, setReadyToRender] = useState(false);

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // scroll tracking logic
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    useEffect(() => {

        // const saveScrollPosition = () => {
        //     // Only store if user has scrolled down s, not on every scroll event (including those at 0)
        //     if (window.scrollY > 0) { // this is really important!!!
        //         sessionStorage.setItem('overviewScroll', window.scrollY.toString());
        //         console.log("Y-position to be saved:", window.scrollY);
        //     }
        // };

        // const saveScrollPosition = () => {
        //     if (window.scrollY === 0) {
        //         // User scrolled to top, save 0
        //         sessionStorage.setItem('overviewScroll', '0');
        //         console.log("Saved Y-position: 0");
        //             // Only store if user(!) has scrolled down, not on every scroll event (including those at 0)
        //     } else if (window.scrollY > 0) { // this is really important!!!
        //         // User(!) scrolled down, save current position
        //         sessionStorage.setItem('overviewScroll', window.scrollY.toString());
        //         console.log("Saved Y-position:", window.scrollY);
        //     }
        // };

        const saveScrollPosition = () => {
            if ((window.scrollY === 0) && (window.scrollY <= 500)) {
                // User scrolled to top, save 0
                sessionStorage.setItem(storageKey, '0');
                console.log("Y-position to be saved: 0");
                // Only store if user(!) has scrolled down, not on every scroll event (including those at 0)
            } else if (window.scrollY > 0) { // this is really important!!!
                // User(!) scrolled down, save current position
                sessionStorage.setItem(storageKey, window.scrollY.toString());
                console.log("Y-position to be saved:", window.scrollY);
            }
        };


        window.addEventListener('scroll', saveScrollPosition);

        // returns a cleanup function
        return () => {
            window.removeEventListener('scroll', saveScrollPosition);
        };
    }, [storageKey]);


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // scroll restoration logic
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    useEffect(() => {
        if (!isReady) return;
        const storedY = sessionStorage.getItem(storageKey);
        const scrollY = storedY ? parseInt(storedY) : 0;
        const checkAndScroll = () => {

            console.log("Saved Y-position: " + scrollY)

            if (document.body.scrollHeight < scrollY + window.innerHeight) {
                setTimeout(checkAndScroll, 50); // "try again" mechanism  implemented by the recursive call to checkAndScroll
                return;
            }
            // Smooth scroll here
            window.scrollTo({ top: scrollY, behavior: 'smooth' });

            // Optional: delay reveal just a bit to match scroll speed
            setTimeout(() => setReadyToRender(true), revealDelay); // Adjust if needed
        };
        checkAndScroll();
    }, [isReady, storageKey, revealDelay]);

    return readyToRender;
}
