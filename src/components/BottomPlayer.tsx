import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { usePlayer } from "../context/PlayerProvider";
import Entypo from "@expo/vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const { height: screenHeight } = Dimensions.get("window");

const BottomPlayer = () => {
  const { track, isLoading, isError } = usePlayer();

  if (!track) return null;

  return (
    <View
      className={`w-full overflow-hidden h-[80px] p-3 bottom-14 absolute ${
        track ? "block" : "hidden"
      }`}
    >
      <Pressable
        onPress={() => router.push("/fullPlayer")}
        className={`bg-[#1ED760] w-full h-full rounded-md p-2 flex-row`}
      >
        {isLoading && <ActivityIndicator />}
        {isError && (
          <Text className="text-red-500">Error loading track details</Text>
        )}

        {track && (
          <View className="w-full flex-row justify-between">
            <View className="flex-row items-center gap-3">
              <Image
                source={{ uri: track.normalizedTrack.imageUrl }}
                style={{
                  width: 45,
                  height: "100%",
                  borderRadius: 6,
                }}
                resizeMode="cover"
              />

              <View>
                <Text
                  className="text-black font-semibold max-w-48"
                  numberOfLines={1}
                >
                  {track.normalizedTrack.trackName}
                </Text>
                <Text className="text-black text-sm max-w-48" numberOfLines={1}>
                  {track?.normalizedTrack?.artists?.map((artist: any) => artist.name).join(", ")}
                </Text>
              </View>
            </View>

            <View className="justify-center">
              <Entypo name="controller-play" size={30} color="black" />
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default BottomPlayer;
