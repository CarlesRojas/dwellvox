import type React from "react";
import { createContext, useContext, useState } from "react";
import { Vector3 } from "three";

interface PlayerContextType {
    position: Vector3;
    setPosition: (pos: Vector3) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [position, setPosition] = useState(new Vector3(0, 1, 0));

    return <PlayerContext.Provider value={{ position, setPosition }}>{children}</PlayerContext.Provider>;
};

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePlayer must be used within a PlayerProvider");
    }
    return context;
}
