import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSingleAlbum } from "@/src/utils/useSpotifyQueries";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

const album = () => {
  const { id } = useLocalSearchParams();

  const { albumData, isLoading, isError, error } = useSingleAlbum(id);

  const albumImage = albumData?.images[0]?.url;
  const albumArtistNames = albumData?.artists.map((artist: any) => artist.name);

  if (isLoading) {
    <View className="flex-1 bg-[#191414]">
      <ActivityIndicator size={"large"} color={"#1ED760"} />
    </View>;
  }

  if (isError) {
    <View className="flex-1 bg-[#191414] justify-center items-center">
      <Text className="text-white">Error: {error.message}</Text>
    </View>;
  }

  return (
    <SafeAreaView className={`bg-[#191414] flex-1 px-5 pt-5`}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="w-full flex justify-center items-center overflow-hidden">
          {/* Image */}
          <View style={{ width: 260, height: 260, marginTop: 8 }}>
            <Image
              source={{ uri: albumImage }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 5,
                shadowColor: "white",
              }}
              resizeMode="cover"
            />
          </View>

          {/* Album Details */}
          <View className="w-full mt-8">
            <Text className="text-white font-bold text-xl uppercase">
              {albumData?.name}
            </Text>
            <Text className="text-white font-semibold text-sm capitalize mt-1">
              {albumArtistNames?.length > 2
                ? `${albumArtistNames.slice(0, 2).join(", ")} +${
                    albumArtistNames?.length - 2
                  }`
                : albumArtistNames?.join(", ")}
            </Text>
            <Text className="text-[#949494] font-medium text-sm capitalize mt-1">
              {albumData?.type} • {albumData?.release_date.split("-")[0]}
            </Text>
          </View>
        </View>

        <View className="w-full flex-row mt-4 justify-between">
          {/* Left part */}
          <View className="w-[70%] flex-row items-center gap-6">
            <Image
              source={{ uri: albumImage }}
              style={{
                width: 40,
                height: 50,
                borderWidth: 2,
                borderColor: "#cdc7c7",
                borderRadius: 10,
              }}
              resizeMode="cover"
            />

            <AntDesign name="pluscircleo" size={24} color="#cdc7c7" />
            <Feather name="arrow-down-circle" size={24} color="#cdc7c7" />
            <MaterialCommunityIcons
              name="dots-vertical"
              size={26}
              color="#cdc7c7"
            />
          </View>

          {/* Right Part */}
          <View className="flex-row gap-3 justify-center">
            <View className="justify-center items-center">
              <Entypo name="shuffle" size={24} color="#1ED760" />
            </View>
            <View className="bg-[#1ED760] w-14 h-14 rounded-full justify-center items-center">
              <Entypo name="controller-play" size={28} color="black" />
            </View>
          </View>
        </View>

        {/* Music List */}
        <View className="w-full mt-6 gap-5">
          {albumData?.tracks?.items?.map((item: any) => (
            <Pressable
              key={item?.id}
              className="w-full flex-row justify-between"
            >
              <View className="w-[93%]">
                <Text className="text-white text-lg font-medium">
                  {item?.name}
                </Text>
                <Text className="text-[#cdc7c7]">
                  {item?.artists.map((artist: any) => artist.name).join(", ")}
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
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default album;
