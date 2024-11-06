'use client'

import { createContext, useState } from "react"

interface LayoutContextType {
    isLayoutHidden: boolean;
    setIsLayoutHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutContext = createContext<LayoutContextType>({
    isLayoutHidden: false,
    setIsLayoutHidden: () => { }
});

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLayoutHidden, setIsLayoutHidden] = useState<boolean>(
        () => {
            if (typeof window !== "undefined") {
                const storedIsLayoutHidden = localStorage.getItem(`isLayoutHidden`)
                if (storedIsLayoutHidden) {
                    return JSON.parse(storedIsLayoutHidden)
                }
            }
            return false;
        }
    );
    return (
        <LayoutContext.Provider value={{ isLayoutHidden, setIsLayoutHidden }}>
            {children}
        </LayoutContext.Provider>
    )
}