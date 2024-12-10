import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { usePlayer } from "../context/PlayerProvider";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { ScrollView } from "react-native-gesture-handler";

const fullPlayer = () => {
  const { track, isLoading, isError, error } = usePlayer();

  return (
    <ScrollView showsHorizontalScrollIndicator={false} className="bg-black">
      <View className="flex-1 px-[20px]">
        <LinearGradient
          colors={["#bd6405", "rgba(0,0,0,0.8)"]}
          className="absolute left-0 right-0 bottom-0 h-full"
        />

        <View className="pt-12">
          <View className="flex-row justify-between h-[12vh]">
            <Pressable onPress={() => router.back()}>
              <AntDesign name="down" size={24} color="white" />
            </Pressable>

            <Text className="text-white font-medium" numberOfLines={1}>
              {" "}
              {track?.trackName}{" "}
            </Text>

            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#fff"
            />
          </View>

          <Image
            source={{ uri: track?.imageUrl }}
            style={{ width: "100%", height: 365, borderRadius: 15 }}
            resizeMode="cover"
          />
        </View>

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
          value={0}
          onSlidingComplete={(value) => console.log(value)}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#fff"
        />

        {/* Player buttons */}
        <View className="flex-row justify-between items-center mt-[30px]">
          <Entypo name="shuffle" size={24} color="#22c55e" />

          <View className="flex-row items-center gap-6">
            <AntDesign name="stepbackward" size={24} color="white" />
            <TouchableOpacity className="bg-white w-[60px] h-[60px] justify-center items-center rounded-full">
              <AntDesign name="caretright" size={24} color="black" />
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

      <View className="h-[30vh] px-[20px] mt-[34px]">
        <View className="bg-[#949494] h-full rounded-xl p-5">
          <Text className="text-lg font-bold tracking-wider text-white">
            {" "}
            Lyrics Preview{" "}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default fullPlayer;
