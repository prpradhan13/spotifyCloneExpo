import { Pressable, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { usePlayer } from "../context/PlayerProvider";
import { ArtistType } from "../types/TrackTypes";
import { router } from "expo-router";

const Tracks = React.memo(({ tracks }: any) => {
  const { track, setTrack, setTrackId, playAudio } = usePlayer();

  const handleTrackPress = async () => {
    if (track?.normalizedTrack?.id !== tracks?.id) {
      setTrackId(tracks?.id); // Set the new track ID
      setTrack(tracks); // Update the track state in PlayerProvider
      await playAudio(tracks?.playbackData?.[0]?.musicSample); // Play the new track
    }
  
    router.push('/fullPlayer');
  }
  
  return (
    <View className={`mb-5 ${tracks?.name === "" ? "hidden" : ""}`}>
      <Pressable
        onPress={handleTrackPress}
        className={`w-full flex-row justify-between`}
      >
        <View className="w-[93%]">
          <Text className="text-white text-lg font-medium">{tracks?.name}</Text>
          <Text className="text-[#cdc7c7]">
            {tracks?.artists?.map((artist: ArtistType) => artist.name).join(", ")}
          </Text>
        </View>
        <View className="flex justify-center">
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="#cdc7c7"
          />
        </View>
      </Pressable>
    </View>
  );
});

export default Tracks;
