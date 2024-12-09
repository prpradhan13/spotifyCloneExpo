import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { usePlayer } from "../context/PlayerProvider";
import { useTrackDetails } from "../utils/useSpotifyQueries";
import Entypo from "@expo/vector-icons/Entypo";

const BottomPlayer = () => {
  const { track } = usePlayer();

  const { trackData, isLoading, isError } = useTrackDetails(track || "");

  if (!track) return null;

  return (
    <View
      className={`w-full p-3 absolute bottom-14 ${track ? "block" : "hidden"}`}
    >
      <View className="bg-[#1ED760] w-full h-20 rounded-md p-3 flex-row">
        {isLoading && <ActivityIndicator />}
        {isError && (
          <Text className="text-red-500">Error loading track details</Text>
        )}

        {trackData && (
          <View className="w-full flex-row justify-between">
            <View className="flex-row items-center gap-3">
              <Image
                source={{ uri: trackData?.imageUrl }}
                style={{
                  width: 50,
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
                  {trackData?.trackName}
                </Text>
                <Text className="text-black text-sm max-w-48" numberOfLines={1}>
                  {trackData?.artists?.map((artist) => artist.name).join(", ")}
                </Text>
              </View>
            </View>

            <View className="justify-center">
              <Entypo name="controller-play" size={28} color="black" />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default BottomPlayer;
