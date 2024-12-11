import { useContext, createContext, useState, PropsWithChildren, useEffect } from "react"
import { useTrackDetails } from "../utils/useSpotifyQueries";
import { PlayerContextType, TrackType } from "../types/TrackTypes";
import { useQueryClient } from "@tanstack/react-query";

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export default function PlayerProvider({children}: PropsWithChildren) {
    const [trackId, setTrackId] = useState<string | null>(null);
    const [track, setTrack] = useState<TrackType | null>(null);

    const { trackData, isLoading, isError, error } = useTrackDetails(trackId);
    
    useEffect(() => {
      if (trackData) {
        setTrack(trackData); // Update the track state when data is fetched
      }
    }, [trackData]);

    return (
        <PlayerContext.Provider value={{ setTrackId, track,  isLoading, isError, error }}>
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