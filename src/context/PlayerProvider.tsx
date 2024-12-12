import {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { useTrackDetails } from "../utils/useSpotifyQueries";
import { PlayerContextType, TrackType } from "../types/TrackTypes";
import { Audio } from "expo-av";

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

  const musicSampleUrl = trackData?.playbackData?.[0]?.musicSample || null;

  useEffect(() => {
    if (trackData) {
      setTrack(trackData); // Update the track state when data is fetched
    }
  }, [trackData]);

  // Play audio
  const playAudio = async () => {
    if (!musicSampleUrl) {
      console.error("No music sample URL provided.");
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

      // Create a new sound and play it
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: musicSampleUrl },
        { shouldPlay: false } // Don't play immediately; wait for loading
      );

      setSound(newSound);

      // Set up the playback status update callback
      newSound.setOnPlaybackStatusUpdate(updatePlaybackStatus);

      // Ensure the sound is loaded and ready before playing
      if (status.isLoaded) {
        await newSound.playAsync();
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
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error pausing audio:", error);
    }
  };

  // Update playback status
  const updatePlaybackStatus = (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
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

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <PlayerContext.Provider
      value={{
        setTrackId,
        track,
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
