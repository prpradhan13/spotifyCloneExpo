import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { usePlayer } from "../context/PlayerProvider";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useVideoPlayer, VideoView } from "expo-video";

const fullPlayer = () => {
  const {
    track,
    playAudio,
    pauseAudio,
    isPlaying,
    position,
    duration,
    soundLoading,
    seekAudio,
  } = usePlayer();

  const musicSampleUrl = track?.playbackData?.[0]?.musicSample || null;
  const videoPlayerUrl = track?.playbackData?.[0]?.videoSample || null;

  useEffect(() => {
    if (musicSampleUrl) {
      playAudio(musicSampleUrl);
    }
  }, [track]);

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const videoPlayer = useVideoPlayer(
    videoPlayerUrl ? { uri: videoPlayerUrl } : null,
    (player) => {
      if (videoPlayerUrl) {
        // console.log("Playing video:", videoPlayerUrl);
        player.loop = true;
        player.play();
        player.muted = true;
      } else {
        console.warn("No video sample provided.");
      }
    }
  );

  return (
    <View className="px-[20px] bg-black flex-1 justify-between">
      {track?.playbackData?.[0]?.videoSample && (
        <>
          <LinearGradient
            colors={["rgba(0,0,0,0.2)", "#000"]}
            className="absolute left-0 right-0 bottom-0 h-full z-10"
          />

          <VideoView
            player={videoPlayer}
            style={{
              width: 450,
              height: 800,
              position: "absolute",
            }}
          />
        </>
      )}

      {!track?.playbackData?.[0]?.videoSample && (
        <LinearGradient
          colors={["#bd6405", "rgba(0,0,0,0.8)"]}
          className="absolute left-0 right-0 bottom-0 h-full"
        />
      )}

      <View className="pt-12">
        <View className="flex-row justify-between h-[12vh] z-20">
          <Pressable onPress={() => router.back()}>
            <AntDesign name="down" size={24} color="white" />
          </Pressable>

          <Text className="text-white font-medium" numberOfLines={1}>
            {" "}
            {track?.normalizedTrack?.trackName}{" "}
          </Text>

          <MaterialCommunityIcons name="dots-vertical" size={24} color="#fff" />
        </View>

        {!track?.playbackData?.[0]?.videoSample && (
          <Image
            source={{ uri: track?.normalizedTrack?.imageUrl }}
            style={{ width: "100%", height: 365, borderRadius: 15 }}
            resizeMode="cover"
          />
        )}
      </View>

      <View className="z-20">
        {/* Details of track */}
        <View className="flex-row justify-between items-center mt-[45px]">
          {/* Left Part */}
          <View className="max-w-[70%]">
            <Text
              className="text-white font-bold text-[24px]"
              numberOfLines={1}
            >
              {track?.normalizedTrack?.trackName}
            </Text>
            <Text
              className="text-[#d1d1d1] text-sm font-medium"
              numberOfLines={1}
            >
              {track?.normalizedTrack?.artists
                .map((elem) => elem.name)
                .join(", ")}
            </Text>
          </View>

          {/* Right Part */}
          <View className="flex-row gap-6">
            <AntDesign name="minuscircleo" size={24} color="white" />
            <AntDesign name="pluscircleo" size={24} color="white" />
          </View>
        </View>

        {/* Slider */}
        <Slider
          style={{ width: "100%", marginTop: 28 }}
          value={position / (duration || 1)}
          onSlidingComplete={seekAudio}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#fff"
        />

        <View className="flex-row justify-between mt-1">
          <Text className="text-white text-sm">{formatTime(position)}</Text>
          <Text className="text-white text-sm">{formatTime(duration)}</Text>
        </View>

        {/* Player buttons */}
        <View className="flex-row justify-between items-center mt-[30px]">
          <Entypo name="shuffle" size={24} color="#22c55e" />

          <View className="flex-row items-center gap-6">
            <AntDesign name="stepbackward" size={24} color="white" />

            {/* Button to Play Music */}
            <TouchableOpacity
              onPress={pauseAudio}
              className="bg-white w-[60px] h-[60px] justify-center items-center rounded-full"
              disabled={soundLoading}
            >
              {soundLoading ? (
                <ActivityIndicator size={"small"} color={"black"} />
              ) : (
                <AntDesign
                  name={isPlaying ? "pause" : "caretright"}
                  size={24}
                  color="black"
                />
              )}
            </TouchableOpacity>

            <AntDesign name="stepforward" size={24} color="white" />
          </View>

          <Feather name="clock" size={24} color="white" />
        </View>

        <View className="flex-row justify-between mt-[16px]">
          <Feather name="speaker" size={22} color="white" />
          <Feather name="share-2" size={22} color="white" />
        </View>
      </View>
    </View>
  );
};

export default fullPlayer;
