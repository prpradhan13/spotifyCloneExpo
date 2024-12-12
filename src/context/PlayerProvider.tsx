import {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { useTrackDetails } from "../utils/useSpotifyQueries";
import { PlayerContextType, TrackType } from "../types/TrackTypes";
import { Audio, AVPlaybackStatus } from "expo-av";

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [trackId, setTrackId] = useState<string | null>(null);
  const [track, setTrack] = useState<TrackType | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [soundLoading, setSoundLoading] = useState(false);

  const { trackData, isLoading, isError, error } = useTrackDetails(trackId);

  useEffect(() => {
    if (trackData) {
      setTrack(trackData); // Update the track state when data is fetched
    }
  }, [trackData]);

  // Play audio
  const playAudio = async (musicSampleUrl: string | null | undefined) => {
    if (!musicSampleUrl) {
      // console.log("No audio URL provided yet.");
      return;
    }
  
    setSoundLoading(true);
    try {
      // Stop and unload the previous sound if it exists
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }

      // Create and play the new sound
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: musicSampleUrl },
        { shouldPlay: true } // Play immediately after loading
      );
      // console.log("new sound loaded");

      setSound(newSound);

      // Set up playback status updates
      newSound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
      if (status.isLoaded) {
        setIsPlaying(true);
      } else {
        console.error("Sound failed to load.");
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    } finally {
      setSoundLoading(false);
    }
  };

  // Pause audio
  const pauseAudio = async () => {
    try {
      if (!sound) {
        return;
      }
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error("Error pausing audio:", error);
    }
  };

  // Update playback status
  const updatePlaybackStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  };

  // Seek to a position
  const seekAudio = async (value: number) => {
    if (sound) {
      const newPosition = value * duration;
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
    }
  };

  // Listen to playback status
  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
      return () => {
        sound.setOnPlaybackStatusUpdate(null);
        sound.unloadAsync();
      };
    }
  }, [sound]);

  return (
    <PlayerContext.Provider
      value={{
        setTrackId,
        track,
        setTrack,
        isLoading,
        isError,
        error,
        isPlaying,
        playAudio,
        pauseAudio,
        seekAudio,
        position,
        duration,
        soundLoading,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
