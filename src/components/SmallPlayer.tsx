import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import React, { memo } from "react";
import { usePlayer } from "../context/PlayerProvider";
import { router } from "expo-router";

const SmallPlayer = memo(() => {
  const { track, isLoading, isError, error, soundLoading, isPlaying, playAudio, position } = usePlayer();

  const musicSampleUrl = track?.playbackData?.[0]?.musicSample;

  const handleSmallPlayerPress = () => {
    if (!isPlaying && musicSampleUrl) {
      // If not playing, start the track
      playAudio(musicSampleUrl);
    }
    // Navigate to full player view
    router.push("/fullPlayer");
  };

  if (isLoading && soundLoading) {
    return (
      <View className="absolute right-4 bottom-14 flex-1 justify-center items-center w-24 h-24 rounded-full bg-[#1ED760]">
        <ActivityIndicator size={24} color={"black"} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-white">
        <Text className="text-red-500">Error: {error?.message}</Text>
      </View>
    );
  }

  return (
    <Pressable
      onPress={handleSmallPlayerPress}
      className={`w-24 h-24 overflow-hidden absolute right-4 bottom-14 ${
        track ? "block" : "hidden"
      } rounded-full bg-[#1ED760]`}
    >
      {track?.normalizedTrack?.imageUrl ? (
        <Image
          source={{ uri: track?.normalizedTrack?.imageUrl }}
          style={{ width: "100%", height: "100%", borderRadius: 100 }}
        />
      ) : (
        <Text className="text-center text-white">No Track</Text>
      )}
    </Pressable>
  );
});

export default SmallPlayer;
