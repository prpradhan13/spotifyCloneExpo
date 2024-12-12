import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
  Animated,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useSingleArtist,
  useSingleArtistTracks,
} from "@/src/utils/useSpotifyQueries";
import { usePlayer } from "@/src/context/PlayerProvider";
import BottomPlayer from "@/src/components/BottomPlayer";
import SmallPlayer from "@/src/components/SmallPlayer";

const index = () => {
  const { artistId } = useLocalSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current; // Track scrolling
  const { setTrackId, track, setTrack, playAudio } = usePlayer();

  const { data } = useSingleArtistTracks(artistId);
  const { artistDetails, isLoading, isError, error } =
    useSingleArtist(artistId);

  const artistImage = artistDetails?.imageUrl;

  const imageHeight = scrollY.interpolate({
    inputRange: [0, 200], // Scroll range
    outputRange: [300, 100], // Image height range
    extrapolate: "clamp", // Prevent values outside range
  });

  const handleTrackClick = async (tracks: any) => {
    if (track?.normalizedTrack?.id !== tracks?.id) {
      setTrackId(tracks?.id);
      setTrack(tracks);
      await playAudio(tracks?.playbackData?.[0]?.musicSample)
    }
    router.push('/fullPlayer')
  };

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
      {/* Scrollable Content */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Needed for layout-related animations
        )}
        scrollEventThrottle={16} // Smooth scrolling
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Animated Image */}
        <Animated.View style={{ height: imageHeight, width: "100%" }}>
          <ImageBackground
            source={{ uri: artistImage }}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          >
            <View className="w-full h-full bg-[rgba(0_0_0_0.3)] flex-1 justify-end px-4">
              <Text className="w-[70%] text-[40px] font-extrabold text-white">
                {artistDetails?.name || "Loading..."}
              </Text>
            </View>
          </ImageBackground>
        </Animated.View>

        {/* Tracks Section */}
        <View className="px-4">
          <Text className="text-white text-lg mt-4 font-semibold">
            Top Tracks
          </Text>

          {data?.map((tracks: any) => (
            <Pressable
              onPress={() => handleTrackClick(tracks)}
              key={tracks?.id}
              className="flex-row items-center mb-4"
            >
              <Image
                source={{ uri: tracks?.imageUrl }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  marginRight: 12,
                }}
              />
              <View>
                <Text className="text-white font-semibold">
                  {tracks?.trackName}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </Animated.ScrollView>

      {track && <SmallPlayer />}
    </SafeAreaView>
  );
};

export default index;
