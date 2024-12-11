import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useRef, useState } from "react";
import { usePlayer } from "../context/PlayerProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet } from "react-native";
import { router } from "expo-router";

type SmallPlayerProps = {
  trackId: string;
};

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const SmallPlayer = memo(() => {
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
    <Pressable
      onPress={() => router.push('/fullPlayer')}
      className={`w-24 h-24 overflow-hidden absolute right-4 bottom-14 ${
        track ? "block" : "hidden"
      } rounded-full bg-[#1ED760]`}
    >
      {track?.normalizedTrack.imageUrl ? (
        <Image
          source={{ uri: track.normalizedTrack.imageUrl }}
          style={{ width: "100%", height: "100%", borderRadius: 100 }}
        />
      ) : (
        <Text className="text-center text-white">No Track</Text>
      )}
    </Pressable>
  );
});

export default SmallPlayer;
