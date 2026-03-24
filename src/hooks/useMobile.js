import { useState, useEffect } from 'react';

/**
 * useMobile hook – detects if the screen is mobile-sized.
 */
export const useMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < breakpoint;
        }
        return false;
    });

    useEffect(() => {
        const checkMobile = () => {
            const current = window.innerWidth < breakpoint;
            if (current !== isMobile) {
                setIsMobile(current);
            }
        };

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint, isMobile]);

    return isMobile;
};
