import { ActivityIndicator, Image, Text, View } from "react-native";
import React, { memo } from "react";
import { usePlayer } from "../context/PlayerProvider";

type SmallPlayerProps = {
  trackId: string;
};

const SmallPlayer = memo(({ trackId }: SmallPlayerProps) => {
  const { track, isLoading, isError, error } = usePlayer();

  if (isLoading) {
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
    <View className="absolute right-4 bottom-14 w-24 h-24 rounded-full bg-[#1ED760]">
      
      
      {track?.imageUrl ? (
        <Image
          source={{ uri: track.imageUrl }}
          style={{ width: "100%", height: "100%", borderRadius: 100 }}
        />
      ) : (
        <Text className="text-center text-white">No Track</Text>
      )}
    </View>
  );
});

export default SmallPlayer;
