import TrackPlayer, { Capability } from 'react-native-track-player';

export const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
    } catch (error) {
      console.error('Error setting up TrackPlayer:', error);
    }
};