import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useSingleArtist,
  useSingleArtistTracks,
} from "@/src/utils/useSpotifyQueries";

const index = () => {
  const { artistId } = useLocalSearchParams();

  const { data } = useSingleArtistTracks(artistId);
  const { artistDetails, isLoading, isError, error } =
    useSingleArtist(artistId);

  const artistImage = artistDetails?.imageUrl;

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#191414] justify-center items-center">
        <ActivityIndicator size={"large"} color={"#1ED760"} />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-[#191414] justify-center items-center">
        <Text className="text-white">Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#191414]">
      <View className="w-full h-[35vh] relative">
        {/* Background Image */}
        <ImageBackground
          source={{ uri: artistImage }}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        >
          <View className="w-full h-full bg-[rgba(0_0_0_0.3)] flex justify-end px-4">
            <Text className="w-[70%] text-[40px] font-extrabold text-white">
              {artistDetails?.name || "Loading..."}
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* Scrollable Content */}

      <ScrollView className="flex-1">
        <View className="px-4">
          <Text className="text-white text-lg mt-4 font-semibold">
            Top Tracks
          </Text>
          <View className="">
            {data?.map((track) => (
              <View key={track.id} className="flex-row items-center py-2">
                <Image
                  source={{ uri: track.imageUrl }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                />
                <View>
                  <Text className="text-white font-semibold">
                    {track.trackName}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
