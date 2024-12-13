import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useSingleAlbum,
  useSinglePlaylist,
} from "@/src/utils/useSpotifyQueries";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Tracks from "@/src/components/Tracks";
import { usePlayer } from "@/src/context/PlayerProvider";
import BottomPlayer from "@/src/components/BottomPlayer";
import SmallPlayer from "@/src/components/SmallPlayer";

const album = () => {
  const { queryTitle, id } = useLocalSearchParams();
  const singleId = Array.isArray(id) ? id[0] : id;

  const { track } = usePlayer();

  const isPlaylist = queryTitle === "Popular playlists";

  const { data, isLoading, isError, error } = isPlaylist
    ? useSinglePlaylist(singleId)
    : useSingleAlbum(singleId);

  const image = data?.imageUrl;
  const artistNames = data?.artist?.map((item: any) => item.name) || "";
  const albumTracks = data?.tracks || [];
  const playListTracks = data?.tracks?.map((elem: any) => elem.track) || [];

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
    <SafeAreaView className={`bg-[#191414] flex-1 pt-5`}>
      <View className="flex-1 px-5">
        <View className="w-full flex justify-center items-center overflow-hidden">
          {/* Image */}
          <View style={{ width: 260, height: 260, marginTop: 8 }}>
            <Image
              source={{ uri: image }}
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
              {data?.name}
            </Text>
              {isPlaylist ? (
                <Text className="text-white font-semibold text-sm capitalize mt-1">
                  {data?.playListOwnerName}
                </Text>
              ) : (
                <Text className="text-white font-semibold text-sm capitalize mt-1">
                  {artistNames?.length > 2
                    ? `${artistNames?.slice(0, 2).join(", ")} +${
                        artistNames?.length - 2
                      }`
                    : artistNames?.join(", ")}
                </Text>
              )}
            <Text className="text-[#949494] font-medium text-sm capitalize mt-1">
              {data?.type} • {data?.releaseDate?.split("-")[0]}
            </Text>
          </View>
        </View>

        <View className="w-full flex-row mt-4 justify-between">
          {/* Left part */}
          <View className="w-[70%] flex-row items-center gap-6">
            <Image
              source={{ uri: image }}
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

        <View className="">
          <FlatList
            data={isPlaylist ? playListTracks : albumTracks} // Wrap `data` inside an array because `data` is a object
            keyExtractor={(item) => item?.id}
            initialNumToRender={20}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 55, paddingTop: 10 }}
            renderItem={({ item }) => <Tracks tracks={item} /> }
          />
        </View>
      </View>

      {track && (
        <View className="">
          <SmallPlayer />
        </View>
      )}
    </SafeAreaView>
  );
};

export default album;
