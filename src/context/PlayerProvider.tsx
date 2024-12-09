import { useContext, createContext, useState, PropsWithChildren } from "react"

interface PlayerContextType {
    track: string | null; // Adjust type as per your `track` structure
    setTrack: (trackId: string | null) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);


export default function PlayerProvider({children}: PropsWithChildren) {
    const [track, setTrack] = useState<string | null>(null);

    return (
        <PlayerContext.Provider value={{ track, setTrack }}>
            {children}
        </PlayerContext.Provider>
    )
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
      throw new Error("usePlayer must be used within a PlayerProvider");
    }
    return context;
};