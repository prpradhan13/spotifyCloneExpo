import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerProvider";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Audio } from "expo-av";
import { useVideoPlayer, VideoView } from "expo-video";
import videoSource from "@/src/assets/videoplayback.mp4";

const fullPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const { track, isLoading, isError, error } = usePlayer();

  const playSound = async () => {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("@/src/assets/audio1.mp3")
      );
      setSound(newSound);
      newSound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
      await newSound.playAsync();
      setIsPlaying(true);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  // Pause sound
  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  // Update playback status
  const updatePlaybackStatus = (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
    }
  };

  // Seek to a position
  const handleSeek = async (value: number) => {
    if (sound) {
      const newPosition = value * duration;
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const videoPlayer = useVideoPlayer(
    require("@/src/assets/videoplayback.mp4"),
    (player) => {
      player.loop = true
      player.play();
      player.loop = true;
    }
  );

  return (
    <View className="px-[20px] bg-black flex-1 justify-between">
      {/* For Image LinearGradient */}
      {/* <LinearGradient
        colors={["#bd6405", "rgba(0,0,0,0.8)"]}
        className="absolute left-0 right-0 bottom-0 h-full"
      /> */}

      {/* For Video LinearGradient */}
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

      <View className="pt-12">
        <View className="flex-row justify-between h-[12vh] z-20">
          <Pressable onPress={() => router.back()}>
            <AntDesign name="down" size={24} color="white" />
          </Pressable>

          <Text className="text-white font-medium" numberOfLines={1}>
            {" "}
            {track?.trackName}{" "}
          </Text>

          <MaterialCommunityIcons name="dots-vertical" size={24} color="#fff" />
        </View>

        {/* <Image
              source={{ uri: track?.imageUrl }}
              style={{ width: "100%", height: 365, borderRadius: 15 }}
              resizeMode="cover"
            /> */}
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
              {track?.trackName}
            </Text>
            <Text
              className="text-[#d1d1d1] text-sm font-medium"
              numberOfLines={1}
            >
              {track?.artists.map((elem) => elem.name).join(", ")}
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
          onSlidingComplete={handleSeek}
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
              onPress={isPlaying ? pauseSound : playSound}
              className="bg-white w-[60px] h-[60px] justify-center items-center rounded-full"
            >
              <AntDesign
                name={isPlaying ? "pause" : "caretright"}
                size={24}
                color="black"
              />
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
